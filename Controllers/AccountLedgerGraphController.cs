using Microsoft.AspNetCore.Mvc;
using MyfinII.Data;
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

    [HttpGet("Account")]
    public async Task<GraphJSData> ListRunningLedger()
    {
        List<string> Accounts = new List<string>();
        List<string> Dates = new List<string>();
        List<int> Valus = new List<int>();
        _context.Account.ToList().ForEach(account =>
        {

        });
        return new GraphJSData()
        {
            labels = new string[] { "A", "B" },
            datasets = new[]
            {
                new GraphJSDataDataset()
                {
                    data = new int[] { 1, 2 },
                     label= "A",
                }
            }
        };
    }
}
