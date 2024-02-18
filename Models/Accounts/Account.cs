using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MyfinII.Models.Accounts
{
    public class Account
    {
        public Account() { }
        public Account(string AccountNumber) { this.AccountNumber = AccountNumber; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }
        public string AccountName { get; set; }
        public string AccountType { get; set; }
        public string AccountNumber { get; set; }
    }
}
