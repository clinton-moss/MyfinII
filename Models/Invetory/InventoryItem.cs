using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MyfinII.Models.Invetory.Measurements;
using MyfinII.Models.Invetory.Categories;
using System.Text.Json.Serialization;

namespace MyfinII.Models.Invetory
{
    public class InventoryItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }
        public Brand? Brand { get; set; }
        public InventoryCategory? Category { get; set; }
        public string? SKU { get; set; }
        public string Name { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MeasurementTypesEnum? Unit { get; set; }
        public int? UnitCount { get; set; }

    }
}
