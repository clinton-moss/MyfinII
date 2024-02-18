using MyfinII.Exceptions;
using MyfinII.Helpers.FileProcessing;
using MyfinII.Helpers.FileProcessing.Statements.Templates;
using MyfinII.Models.Accounts;
using MyfinII.Models.Statement.Transaction;
using MyfinII.Models.Util;
using static System.Net.Mime.MediaTypeNames;

namespace MyfinII.Services.Statement;

public class StatementService
{
    public async Task<List<TransactionLedgerItem>> ProcessStatementFile(UploadFile UploadedFile)
    {
        Dictionary<string, List<string>> ValuesRead = new FileProcessor(UploadedFile, new NedbankExcelStatement()).Process();

        Account account = new Account(ValuesRead["account number"][0]);

        // Transactions 
        List<TransactionLedgerItem> Transactions = new List<TransactionLedgerItem>();
        for (int i = 0; i < ValuesRead["transaction date"].Count(); i++)
        {
            Transactions.Add(new TransactionLedgerItem(
                account,
                DateTime.Parse(ValuesRead["transaction date"][i]),
                ValuesRead["transaction description"][i],
                float.Parse(ValuesRead["transaction amount"][i])
                )
            );
        }
        return Transactions;
    }
}
