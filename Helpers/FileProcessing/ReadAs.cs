using ClosedXML.Excel;
using System.Collections;
using System.Diagnostics;

namespace MyfinII.Helpers.FileProcessing;

public class ReadAs
{
    // Decode b64 then push to xlsx
    public static List<List<string>> XLSXB64(string content)
     => XLSX(Convert.FromBase64String(content));


    public static List<List<string>> XLSX(byte[] content)
    {
        List<List<string>> res = new List<List<string>>();
        using (MemoryStream memStream = new MemoryStream(content))
        {
            try
            {
                using (var excelWorkbook = new XLWorkbook(memStream))
                {
                    var nonEmptyDataRows = excelWorkbook.Worksheet(1).RowsUsed();

                    foreach (var dataRow in nonEmptyDataRows)
                    {
                        List<string> row = new List<string>();

                        for (int c = 1; c <= dataRow.CellsUsed().Count();c++ )
                        {
                            try
                            {
                                row.Add(dataRow.Cell(c).Value.ToString());
                            }catch(Exception ex) { }
                            //var cell = dataRow.Cell(c).Value;
                        }
                        res.Add(row);
                            //for row number check
                            //if (dataRow.RowNumber() >= 3 && dataRow.RowNumber() <= 20)
                            //{
                            //to get column # 3's data
                            
                        //}
                    }
                }

            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        } // the using statement calls Dispose() which closes the package.
        return res;
    }


}