using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyfinII.Data;
using MyfinII.Models.Statement.Transaction;
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
        public async Task<List<TransactionLedgerItem>> UploadStatement(UploadFile UploadedFile)
            => await new StatementService().ProcessStatementFile(UploadedFile);
    }
}
