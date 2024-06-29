using System.Text.Json.Serialization;

namespace MyfinII.Models.Statement.Transaction.DropedItems;

public class DropedItemLedger
{
    [JsonPropertyName("Ledger")]
    public DropedItemLedgerLineItem[] Ledger { get; set; }
}
public class DropedItemLedgerLineItem
{
    [JsonPropertyName("Date")]
    public string Date { get; set; }
    [JsonPropertyName("Description")]
    public string Description { get; set; }
    [JsonPropertyName("Credit")]
    public string? Credit { get; set; } = null;
    [JsonPropertyName("Debit")]
    public string? Debit { get; set; } = null;
    [JsonPropertyName("Ammount")]
    public string? Ammount { get; set; } = null;
    [JsonPropertyName("Account")]
    public string? Account { get; set; } = null;
}
