namespace MyfinII.Helpers.FileProcessing
{
    public class ISpreadSheetLayoutCellRange
    {
        public ISpreadSheetLayoutCellRange(int RowStart, int RowEnd, int ColumnStart, int ColumnEnd)
        {
            this.RowStart = RowStart;
            this.RowEnd = RowEnd;
            this.ColumnStart = ColumnStart;
            this.ColumnEnd = ColumnEnd;
        }
        public int RowStart { get; set; }
        public int RowEnd { get; set; }
        public int ColumnStart { get; set; }
        public int ColumnEnd { get; set; }
    }
}
