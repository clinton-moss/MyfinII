using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyfinII.Data;
using MyfinII.Models.Accounts;
using MyfinII.Models.Graph;
using MyfinII.Models.Statement.Transaction;
using MyfinII.Services.Account;

namespace MyfinII.Controllers;

[Route("api/Account/Ledger/Graph")]
[ApiController]
public class AccountLedgerGraphController : ControllerBase
{
    private readonly MyfinIIContext _context;

    public AccountLedgerGraphController(MyfinIIContext context)
    {
        _context = context;
    }

    [HttpGet("Account/{AccountId}")]
    public async Task<GraphJSData> ListRunningLedger(Guid AccountId)
    {

        //List<string> Accounts = new List<string>();
        List<Account> Accounts = await _context.Account.ToListAsync();
        List<string> Dates = new List<string>();
        List<double> Values = new List<double>();
        string accountName = "";

        // Loop through all accounts

        // Pull a list of all ledger items
        var _ledgerByDate = await _context.TransactionLedgerItem
            .Include(a => a.Account)
            .Where(a => a.Account.Id == AccountId).GroupBy(a => a.DateTime).ToListAsync();
        // Labels = Dates
        // Data = Amounts per label
        // Label = Account

        var dates = new List<string>();
        foreach (var d in _ledgerByDate)
        {
            dates.Add(d.Key.ToString());
            foreach (var a in d)
            {
                accountName = a.Account.AccountName;
                Values.Add(a.Amount);
            }
        }

        _context.Account.ToList().ForEach(account =>
        {

        });
        return new GraphJSData()
        {
            // labels = new string[] { "A", "B" },
            labels = dates.ToArray(),
            datasets = new[]
            {
                new GraphJSDataDataset()
                {
                    data =  Values.ToArray(),
                     label= accountName,
                }
            }
        };
    }
    [HttpGet("OverView/Monthly")]
    public async Task<GraphJSData> ListRunningLedger()
    {

        //List<string> Accounts = new List<string>();
        List<Account> Accounts = await _context.Account.ToListAsync();
        List<string> Dates = new List<string>();
        List<double> Values = new List<double>();
        List<double> ValuesCred = new List<double>();
        List<double> ValuesDebt = new List<double>();
        List<double> ValuesBal = new List<double>();
        string accountName = "";
        double balance = 0;

        //// Loop through all accounts

        //// Pull a list of all ledger items
        //var _ledgerByDate = (await _context.TransactionLedgerItem
        //    .Include(a => a.Account)
        //    //.Where(a => a.Account.Id == AccountId)
        //    .ToListAsync())
        //    .GroupBy(a => a.DateTime.ToString("yyyyMM")).OrderBy(a => a.Key);
        //// Labels = Dates
        //// Data = Amounts per label
        //// Label = Account

        //var dates = new List<string>();
        //foreach (var d in _ledgerByDate)
        //{
        //    dates.Add(d.Key.ToString());
        //    accountName = "ALL";
        //    Values.Add(d.Sum(x => x.Amount));
        //    ValuesDebt.Add(d.Where(x => x.Amount < 0).Sum(x => x.Amount));
        //    ValuesCred.Add(d.Where(x => x.Amount >= 0).Sum(x => x.Amount));
        //    //Values.Add(_ledgerByDate[d]);
        //    //foreach (var a in d)
        //    //{
        //    //    accountName = a.Account.AccountName;
        //    //    Values.Add(a.Amount);
        //    //}
        //}

        var dates = new List<string>();
        for (int y = 2023; y <= 2024; y++)
        {
            for (int m = 1; m <= 12; m++)
            {
                dates.Add($"{y}{m.ToString("D2")}");
            }
        }
        List<GraphJSDataDataset> All = new List<GraphJSDataDataset>();
        _context.Account.ToList().ForEach(async account =>
        {
            balance = 0;
            Dates = new List<string>();
            Values = new List<double>();
            ValuesCred = new List<double>();
            ValuesDebt = new List<double>();
            ValuesBal = new List<double>();
            string accountName = account.AccountName;

            // Loop through all accounts

            // Pull a list of all ledger items
            var _ledgerByDate = (await _context.TransactionLedgerItem
                .Include(a => a.Account)
                .Where(a => a.Account.Id == account.Id)
                .ToListAsync())
                .GroupBy(a => a.DateTime.ToString("yyyyMM")).OrderBy(a => a.Key);
            // Labels = Dates
            // Data = Amounts per label
            // Label = Account


            foreach (var ym in dates)
            {
                var tym = _ledgerByDate.Where(x => x.Key == ym).ToList();
                if (tym != null && tym.Count() > 0)
                {
                    //Values.Add(tym.Sum(x => x.Amount));
                    //ValuesDebt.Add(tym.Where(x => x.Amount < 0).Sum(x => x.Amount));
                    //ValuesCred.Add(tym.Where(x => x.Amount >= 0).Sum(x => x.Amount));
                    foreach (var d in tym)
                    {
                        balance += d.Sum(x => x.Amount);
                        //dates.Add(d.Key.ToString());
                        //accountName = account.AccountName;
                        Values.Add(d.Sum(x => x.Amount));
                        ValuesDebt.Add(d.Where(x => x.Amount < 0).Sum(x => x.Amount));
                        ValuesCred.Add(d.Where(x => x.Amount >= 0).Sum(x => x.Amount));
                        ValuesBal.Add(balance);
                    }
                }
                else
                {
                    Values.Add(0);
                    ValuesDebt.Add(0);
                    ValuesCred.Add(0);
                    ValuesBal.Add(0);
                }
            }
            //foreach (var d in _ledgerByDate)
            //{
            //    dates.Add(d.Key.ToString());
            //    accountName = account.AccountName;
            //    Values.Add(d.Sum(x => x.Amount));
            //    ValuesDebt.Add(d.Where(x => x.Amount < 0).Sum(x => x.Amount));
            //    ValuesCred.Add(d.Where(x => x.Amount >= 0).Sum(x => x.Amount));
            //}

            All.Add(new GraphJSDataDataset()
            {
                data = Values.ToArray(),
                label = accountName
            });
            All.Add(new GraphJSDataDataset()
            {
                data = ValuesDebt.ToArray(),
                label = accountName + " Debt",
                backgroundColor = "red"
            });
            All.Add(new GraphJSDataDataset()
            {
                data = ValuesCred.ToArray(),
                label = accountName + " Credit",
                backgroundColor = "green"
            });
            All.Add(new GraphJSDataDataset()
            {
                data = ValuesBal.ToArray(),
                label = accountName + " Running Balance",
                backgroundColor = "yellow"
            });
        });
        return new GraphJSData()
        {
            // labels = new string[] { "A", "B" },
            labels = dates.ToArray(),
            datasets = All.ToArray()
            /*new[]
            {
                new GraphJSDataDataset()
                {
                    data =  Values.ToArray(),
                     label= accountName,
                },
                new GraphJSDataDataset()
                {
                    data =  ValuesDebt.ToArray(),
                     label= accountName + " Debt",
                     backgroundColor = "red"
                },
                new GraphJSDataDataset()
                {
                    data =  ValuesCred.ToArray(),
                     label= accountName + " Credit",
                     backgroundColor = "green"
                },
            }*/
        };
    }
}
