using Microsoft.EntityFrameworkCore;
using MyfinII.Data;
using MyfinII.Models.Invetory.Categories;

namespace MyfinII.Services.Inventory.Categories
{
    public class InventoryCategoryService
    {
        private MyfinIIContext db;

        public InventoryCategoryService(MyfinIIContext db)
        {
            this.db = db;
        }

        async internal Task<InventoryCategory> AddCategory(InventoryCategory category)
        {
            db.InventoryCategories.Add(category);
            await db.SaveChangesAsync();
            return category;
        }

        async internal Task<IEnumerable<InventoryCategory>> ListCategories()
            => await db.InventoryCategories.ToListAsync();
    }
}
