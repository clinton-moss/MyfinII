namespace MyfinII.Helpers.FileProcessing
{
    public interface ISpreadSheetLayout
    {
        IEnumerable<ISpreadSheetLayoutCell> CellFormat { get; }
    }
}
