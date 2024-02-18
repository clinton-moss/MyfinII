namespace MyfinII.Helpers.FileProcessing
{
    public class ISpreadSheetLayoutCell
    {
        public string Name { get; set;  }
        public string Type { get; set; }
        public SpreadSheetLayoutCellFormats Format { get; set; }
        public ISpreadSheetLayoutCellRange ExpectedDescriptionRange { get; set; }
        public ISpreadSheetLayoutCellRange ExpectedValueRange { get; set; }
    }
}
