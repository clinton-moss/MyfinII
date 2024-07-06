﻿using System.Globalization;
using System.Text.RegularExpressions;

namespace MyfinII.Helpers;

public static class CurrencySanitizer
{
    public static double SanitizeCurrency(string currency, bool? isNeg = false, bool? checkNeg = false)
    {
        currency = Regex.Replace(currency, "[^0-9.]", "");
        if ((bool)checkNeg)
        {
            if (currency.Substring(0, 1) != "-" && (bool)isNeg)
            {
                currency = "-" + currency;
            }
        }
        double d = 2000.00;

        return double.Parse(currency, NumberStyles.Float, CultureInfo.InvariantCulture);
    }
}