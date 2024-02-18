using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyfinII.Models.Accounts;
using MyfinII.Models.Statement.Transaction;

namespace MyfinII.Data
{
    public class MyfinIIContext : DbContext
    {
        public MyfinIIContext (DbContextOptions<MyfinIIContext> options)
            : base(options)
        {
        }

        /*
         * Accounts
         */
        public DbSet<MyfinII.Models.Accounts.Account> Account { get; set; } = default!;
        /*
         * Statements
         */
        public DbSet<TransactionLedgerItem> TransactionLedgerItem { get; set; } = default!;
    }
}
