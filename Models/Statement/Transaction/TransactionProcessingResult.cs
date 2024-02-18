namespace MyfinII.Models.Statement.Transaction
{
    public class TransactionProcessingResult
    {
        public TransactionProcessingResult(TransactionLedgerItem transaction, bool isSuccess, string status)
        {
            Transaction = transaction;
            IsSuccess = isSuccess;
            Status = status;
        }

        public TransactionLedgerItem Transaction { get; set; }
        public bool IsSuccess { get; set; } = false;
        public string Status { get; set; }
    }
}
