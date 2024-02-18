namespace MyfinII.Helpers.FileProcessing.Statements.Templates
{
    public class NedbankExcelStatement : ISpreadSheetLayout
    {
        public IEnumerable<ISpreadSheetLayoutCell> CellFormat => new List<ISpreadSheetLayoutCell>()
        {
            new ISpreadSheetLayoutCell()
            {
                Name="Account Number",
                Format=SpreadSheetLayoutCellFormats.NUMBER,
                Type="account number",
                ExpectedDescriptionRange=new ISpreadSheetLayoutCellRange(2,2,1,1),
                ExpectedValueRange=new ISpreadSheetLayoutCellRange(2,2,2,2),
            },
            new ISpreadSheetLayoutCell()
            {
                Name="Account Description",
                Format=SpreadSheetLayoutCellFormats.STRING,
                Type="account name",
                ExpectedDescriptionRange=new ISpreadSheetLayoutCellRange(3,3,1,1),
                ExpectedValueRange=new ISpreadSheetLayoutCellRange(3,3,2,2),
            },
            new ISpreadSheetLayoutCell()
            {
                Name="Date",
                Format=SpreadSheetLayoutCellFormats.DATE,
                Type="transaction date",
                ExpectedDescriptionRange=new ISpreadSheetLayoutCellRange(4,4,1,1),
                ExpectedValueRange=new ISpreadSheetLayoutCellRange(5,-1,1,2),
            },
            new ISpreadSheetLayoutCell()
            {
                Name="Description",
                Format=SpreadSheetLayoutCellFormats.STRING,
                Type="transaction description",
                ExpectedDescriptionRange=new ISpreadSheetLayoutCellRange(4,4,2,2),
                ExpectedValueRange=new ISpreadSheetLayoutCellRange(5,-1,2,2),
            },
            new ISpreadSheetLayoutCell()
            {
                Name="Amount",
                Format=SpreadSheetLayoutCellFormats.FLOAT,
                Type="transaction amount",
                ExpectedDescriptionRange=new ISpreadSheetLayoutCellRange(4,4,3,3),
                ExpectedValueRange=new ISpreadSheetLayoutCellRange(5,-1,3,3),
            },
            new ISpreadSheetLayoutCell()
            {
                Name="Balance",
                Format=SpreadSheetLayoutCellFormats.FLOAT,
                Type="transaction balance",
                ExpectedDescriptionRange=new ISpreadSheetLayoutCellRange(4,4,4,4),
                ExpectedValueRange=new ISpreadSheetLayoutCellRange(5,-1,4,4),
            },
        };
    }
}
