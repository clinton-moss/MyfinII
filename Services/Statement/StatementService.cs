using DocumentFormat.OpenXml.Vml.Spreadsheet;
using Microsoft.IdentityModel.Tokens;
using MyfinII.Data;
using MyfinII.Exceptions;
using MyfinII.Helpers;
using MyfinII.Helpers.DateTimeFunctions;
using MyfinII.Helpers.FileProcessing;
using MyfinII.Helpers.FileProcessing.Statements.Templates;
using MyfinII.Models.Accounts;
using MyfinII.Models.Statement.Transaction;
using MyfinII.Models.Statement.Transaction.DropedItems;
using MyfinII.Models.Util;
using System.Text.RegularExpressions;
using static System.Net.Mime.MediaTypeNames;

namespace MyfinII.Services.Statement;

public class StatementService
{
    private readonly MyfinIIContext _context;

    public StatementService(MyfinIIContext context)
    {
        _context = context;
    }
    public async Task<List<TransactionProcessingResult>> ProcessStatementFile(UploadFile UploadedFile)
    {
        Dictionary<string, List<string>> ValuesRead = new FileProcessor(UploadedFile, new NedbankExcelStatement()).Process();
        List<TransactionProcessingResult> Results = new List<TransactionProcessingResult>();

        Models.Accounts.Account account = _context.Account.FirstOrDefault(a => a.AccountNumber == ValuesRead["account number"][0].Trim());
        if (account == null)
        {
            try
            {
                account = new Models.Accounts.Account(ValuesRead["account number"][0].Trim());
                if (ValuesRead.ContainsKey("account name"))
                    account.AccountName = ValuesRead["account name"][0].Trim();
                account.AccountType = "Unkown";
                _context.Add(account);
                _context.SaveChanges();
            }
            catch (Exception ex) { }
        }
        // Transactions 
        List<TransactionLedgerItem> Transactions = new List<TransactionLedgerItem>();
        for (int i = 0; i < ValuesRead["transaction date"].Count(); i++)
        {
            Results.Add(LogTransaction(
                new TransactionLedgerItem(
                    account,
                    DateTime.Parse(ValuesRead["transaction date"][i]),
                    ValuesRead["transaction description"][i],
                    float.Parse(ValuesRead["transaction amount"][i])
                    )));
        }
        return Results;
    }

    public async Task<TransactionProcessingResult> ForceStatementEntries(TransactionProcessingResult Ledger)
    {
        Ledger.Transaction.Id = new Guid();
        return LogTransaction(await GetAccountDetails(Ledger.Transaction), true);
    }
            
    public async Task<TransactionLedgerItem> GetAccountDetails(TransactionLedgerItem Item)
    {
        if (string.IsNullOrEmpty(Item.Account.AccountName))
            throw new Exception("No account number specified");
        Models.Accounts.Account account = _context.Account.FirstOrDefault(a => (a.AccountNumber == Item.Account.AccountName.Trim() || a.AccountName == Item.Account.AccountName.Trim()));
        if (account == null)
        {
            try
            {
                account = new Models.Accounts.Account(Item.Account.AccountName.Trim());
                account.AccountName = Item.Account.AccountName.Trim();
                account.AccountType = "Unkown";
                _context.Add(account);
                _context.SaveChanges();
            }
            catch (Exception ex) { }
        }
        Item.Account = account;
        //Item.Account
        return Item;
    }
    public async Task<List<TransactionProcessingResult>> ProcessStatementEntries(DropedItemLedger Ledger)
    {
        List<TransactionProcessingResult> Results = new List<TransactionProcessingResult>();

        foreach (var item in Ledger.Ledger)
        {
            if (item == null) continue;
            try
            {
                if (string.IsNullOrEmpty(item.Account))
                    throw new Exception("No account number specified");
                Models.Accounts.Account account = _context.Account.FirstOrDefault(a => (a.AccountNumber == item.Account.Trim() || a.AccountName == item.Account.Trim()));
                if (account == null)
                {
                    try
                    {
                        account = new Models.Accounts.Account(item.Account.Trim());
                        account.AccountName = item.Account.Trim();
                        account.AccountType = "Unkown";
                        _context.Add(account);
                        _context.SaveChanges();
                    }
                    catch (Exception ex) { }
                }

                Results.Add(LogTransaction(
                    new TransactionLedgerItem(
                        account,
                        DateTimeSanitizer.SanitizeDate(item.Date),
                        item.Description,
                        !string.IsNullOrEmpty(item.Ammount) ? CurrencySanitizer.SanitizeCurrency(item.Ammount) :
                        !string.IsNullOrEmpty(item.Credit) ? CurrencySanitizer.SanitizeCurrency(item.Credit)
                        : CurrencySanitizer.SanitizeCurrency(item.Debit, true, true) // item.Debit.Substring(0, 1) != "-" ? double.Parse("-" + item.Debit) : double.Parse(item.Debit)
                                                                                     //float.Parse(
                                                                                     //    string.IsNullOrEmpty(item.Ammount) ? item.Ammount :
                                                                                     //    !string.IsNullOrEmpty(item.Credit) ? item.Credit
                                                                                     //    : item.Debit.Substring(0, 1) != "-" ? "-" + item.Debit : item.Debit)
                        )
                    )
                );
            }
            catch (Exception ex)
            {
                Results.Add(new TransactionProcessingResult
                (
                    null,
                    false,
                    ex.Message
                ));
            }
        }
        return Results;
    }

    private TransactionProcessingResult LogTransaction(TransactionLedgerItem Transaction, bool? force = false)
    {
        // Check already imported
        var _ledgerExists = _context.TransactionLedgerItem.FirstOrDefault(a => a.DateTime == Transaction.DateTime && a.Description == Transaction.Description && a.Amount == Transaction.Amount);
        if ((bool)force)
        {
            _context.Add(Transaction);
            _context.SaveChanges();
        }
        else if (_ledgerExists == null)
        {
            _context.Add(Transaction);
            _context.SaveChanges();
        }
        else
            return new TransactionProcessingResult(_ledgerExists, false, "Transaction Previously Imported");
        return new TransactionProcessingResult(Transaction, true, "Transaction Imported");
    }

}
