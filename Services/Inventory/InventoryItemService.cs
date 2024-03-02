using Microsoft.EntityFrameworkCore;
using MyfinII.Data;
using MyfinII.Models.Invetory;
using MyfinII.Models.Invetory.Categories;

namespace MyfinII.Services.Inventory
{
    public class InventoryItemService
    {
        private MyfinIIContext db;
        private InventoryItem inventoryItem;


        public InventoryItemService(MyfinIIContext db)
        {
            this.db = db;
        }

        async internal Task<InventoryItem> SaveChangesAsync()
        {
            inventoryItem.Brand = await SetBrand(inventoryItem.Brand);
            inventoryItem.Category = await SetCategoryAsync(inventoryItem.Category);
            if (inventoryItem.Id != Guid.Empty && inventoryItem.Id != Guid.NewGuid())
            {
                db.Update<InventoryItem>(inventoryItem);
            }
            else
            {
                db.Add<InventoryItem>(inventoryItem);
            }
            await db.SaveChangesAsync();
            return inventoryItem;
        }

        async internal Task<Brand> SetBrand(Brand brand)
        {
            var _brand = await db.Brands.FirstOrDefaultAsync(b => b.Id == brand.Id || b.BrandName == brand.BrandName);
            if (_brand == null)
            {
                db.Add(brand);
                db.SaveChanges();
                return brand;
            }
            return _brand;
        }

        internal async Task<InventoryCategory> SetCategoryAsync(InventoryCategory category)
        {
            var _category = await db.InventoryCategories.FirstOrDefaultAsync(c => c.Id == category.Id || c.CategoryName == category.CategoryName);
            if (_category == null)
            {
                db.Add(_category);
                db.SaveChanges();
                return category;
            }
            return _category;
        }

        internal InventoryItemService SetInventoryItem(InventoryItem inventoryItem)
        {
            this.inventoryItem = inventoryItem;
            return this;
        }
    }
}
