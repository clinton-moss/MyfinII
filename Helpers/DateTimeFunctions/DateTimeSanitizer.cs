namespace MyfinII.Helpers.DateTimeFunctions;

public static class DateTimeSanitizer
{
    public static DateTime SanitizeDate(string date)
    {
        try
        {
            if (date.Substring(2, 1) == "/" && date.Substring(5, 1) == "/")
            {
                var splt = date.Split("/");
                date = splt[2] + "-" + splt[1] + "-" + splt[0];
            }
        }
        catch
        {
        }
        return DateTime.Parse(date);
    }
}
