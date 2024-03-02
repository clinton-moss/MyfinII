using Microsoft.EntityFrameworkCore;
using MyfinII.Data;
using MyfinII.Models.Invetory;

namespace MyfinII.Services.Inventory.Brands
{
    public class BrandService
    {
        private MyfinIIContext db;
        private Brand brand;


        public BrandService(MyfinIIContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<Brand>> ListBrands() {
            return await db.Brands.ToListAsync();
        }
    }
}
