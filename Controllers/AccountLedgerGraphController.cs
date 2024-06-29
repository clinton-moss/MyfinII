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
        List<float> Values = new List<float>();
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
                    data = Values.ToArray(),
                     label= accountName,
                }
            }
        };
    }
}
