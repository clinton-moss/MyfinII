using MyfinII.Models.Accounts;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MyfinII.Models.Statement.Transaction;

public class TransactionLedgerItem
{
    public TransactionLedgerItem()
    {

    }
    public TransactionLedgerItem(Account account, DateTime dateTime, string description, float amount)
    {
        Account = account;
        DateTime = dateTime;
        Description = description;
        Amount = amount;
    }

    public TransactionLedgerItem(Guid id, Account account, DateTime dateTime, string description, float amount)
    {
        Id = id;
        Account = account;
        DateTime = dateTime;
        Description = description;
        Amount = amount;
    }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public Guid Id { get; set; }
    public Account Account { get; set; }
    public DateTime DateTime { get; set; }
    public string Description { get; set; }
    public float Amount { get; set; }
}
