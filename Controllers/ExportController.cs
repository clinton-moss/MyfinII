using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyfinII.Data;
using MyfinII.Models.Accounts;
using MyfinII.Models.Graph;
using MyfinII.Models.Statement.Transaction;
using MyfinII.Services.Account;
using System.Data;

namespace MyfinII.Controllers;

[Route("api/Export")]
[ApiController]
public class ExportController : ControllerBase
{
    private readonly MyfinIIContext _context;

    public ExportController(MyfinIIContext context)
    {
        _context = context;
    }

    private async Task<DataTable> GetLedger(Account account)
    {
        DataTable table = new DataTable();

        table.TableName = "Ledger";

        DataColumn dcDT = table.Columns.Add("Date/Time", typeof(DateTime));
        DataColumn dcD = table.Columns.Add("Description", typeof(string));
        DataColumn dcDD = table.Columns.Add("Debit", System.Type.GetType("System.Double"));
        dcDD.AllowDBNull = true;
        DataColumn dcC = table.Columns.Add("Credit", System.Type.GetType("System.Double"));
        dcC.AllowDBNull = true;
        DataColumn dcA = table.Columns.Add("Amount", System.Type.GetType("System.Double"));
        //table.Rows.Add(new object[] { "Test" });
        (await _context.TransactionLedgerItem.ToListAsync())
            .ForEach(row => table.Rows.Add(new object[] {
                row.DateTime,
                row.Description,
                row.Amount < 0 ? row.Amount : null,
                row.Amount > -1 ? row.Amount : null,
                row.Amount,
            }));
        return table;
    }

    [HttpGet("Ledgers")]
    public async Task<ActionResult> ExportAllLedgers()
    {
        string base64String;
        using (var wb = new XLWorkbook())
        {
            (await _context.Account.ToListAsync())
                .ForEach(async account =>
                {
                    var sheet = wb.AddWorksheet(await GetLedger(account), account.AccountName);
                    sheet.Columns(1, 5).Style.Font.FontColor = XLColor.Black;
                    string currencyFmt = "# ##0.00;[RED]-# ##0.00";
                    sheet.Cells("C:C").Style.NumberFormat.Format = currencyFmt;
                    sheet.Cells("D:D").Style.NumberFormat.Format = currencyFmt;
                    sheet.Cells("E:E").Style.NumberFormat.Format = currencyFmt;
                    sheet.Columns().AdjustToContents();
                });
            //_context.TransactionLedgerItem.ToList()
            //    .ForEach(e => e.)
            //var sheet = wb.AddWorksheet(await GetLedger(), "Account");

            // Apply font color to columns 1 to 5


            using (var ms = new MemoryStream())
            {
                wb.SaveAs(ms);

                // Convert the Excel workbook to a base64-encoded string
                base64String = Convert.ToBase64String(ms.ToArray());
            }
        }
        return new CreatedResult(string.Empty, new
        {
            Code = 200,
            Status = true,
            Message = "",
            Data = base64String
        });
    }
}
