using MyfinII.Exceptions;
using MyfinII.Models.Util;

namespace MyfinII.Helpers.FileProcessing
{
    public class FileProcessor
    {
        private readonly UploadFile _UploadedFile;
        private readonly ISpreadSheetLayout _Template;

        public FileProcessor(UploadFile UploadedFile, ISpreadSheetLayout Template)
        {
            this._UploadedFile = UploadedFile;
            this._Template = Template;
        }
        public Dictionary<string, List<string>> Process()
        {
            switch (_UploadedFile.ContentType)
            {
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    return ReadFromTemplate(ReadAs.XLSXB64(_UploadedFile.Content));
                default:
                    throw new UnsupportedFileFormatException("File format not supported");
            }
        }

        private Dictionary<string, List<string>> ReadFromTemplate(List<List<string>> matrix)
        {
            Dictionary<string,List<string>> values = new Dictionary<string, List<string>>();
            foreach(var data in this._Template.CellFormat)
            {
                try
                {
                    string descrt = matrix.ElementAt(data.ExpectedDescriptionRange.RowStart - 1).ElementAt(data.ExpectedDescriptionRange.ColumnStart -1);
                    values[data.Type] = new List<string>();
                    if (data.ExpectedValueRange.RowEnd != -1 && data.ExpectedValueRange.ColumnEnd != -1)
                    {
                        values[data.Type].Add(matrix.ElementAt(data.ExpectedValueRange.RowStart - 1).ElementAt(data.ExpectedValueRange.ColumnStart - 1));
                    }
                    else if (data.ExpectedValueRange.RowEnd == -1)
                    {
                        for(var r = data.ExpectedValueRange.RowStart; r <= matrix.Count(); r++)
                        {
                            try { values[data.Type].Add(matrix.ElementAt(r - 1).ElementAt(data.ExpectedValueRange.ColumnStart - 1)); } catch { }
                        }
                    }
                    else if (data.ExpectedValueRange.ColumnEnd == -1)
                    {
                        throw new Exception("Reading from column range not yet supported");
                    }
                    else
                    {

                    }
                }
                catch(Exception ex) { }
                

                //data.ExpectedDescriptionRange
            }
            return values;
        }
    }
}
