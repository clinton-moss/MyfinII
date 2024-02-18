using Microsoft.EntityFrameworkCore;
using MyfinII.Data;
using MyfinII.Models.Statement.Transaction;

namespace MyfinII.Services.Account
{
    public class AccountsService
    {
        private readonly MyfinIIContext _context;

        public AccountsService(MyfinIIContext context)
        {
            _context = context;
        }

        public async Task<List<TransactionLedgerItem>> ListRunningLedger(Models.Accounts.Account account)
            => await _context.TransactionLedgerItem.Where(a => a.Account.Id == account.Id).ToListAsync();
    }
}
