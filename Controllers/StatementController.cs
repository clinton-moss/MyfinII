using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyfinII.Data;
using MyfinII.Models.Statement.Transaction;
using MyfinII.Models.Statement.Transaction.DropedItems;
using MyfinII.Models.Util;
using MyfinII.Services.Statement;

namespace MyfinII.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatementController : ControllerBase
    {
        private readonly MyfinIIContext _context;

        public StatementController(MyfinIIContext context)
        {
            _context = context;
        }

        [HttpPost("Upload")]
        public async Task<List<TransactionProcessingResult>> UploadStatement(UploadFile UploadedFile)
            => await new StatementService(_context).ProcessStatementFile(UploadedFile);
        
        [HttpPost("Entries")]
        public async Task<List<TransactionProcessingResult>> ProcessStatementEntries(DropedItemLedger Ledger)
        => await new StatementService(_context).ProcessStatementEntries(Ledger);
        //=> await new StatementService(_context).ProcessStatementFile(UploadedFile);
    }
}
