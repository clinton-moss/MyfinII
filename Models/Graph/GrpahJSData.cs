namespace MyfinII.Models.Graph;

public class GraphJSData
{
    public string[] labels { get; set; }
    public GraphJSDataDataset[] datasets { get; set; }
}

public class GraphJSDataDataset
{
    public string label { get; set; }
    public double[] data { get; set; }
    public string? backgroundColor { get; set; }
}
