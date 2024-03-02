using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using MyfinII.Data;
using MyfinII.Models.Invetory;
using MyfinII.Services.Inventory;
using MyfinII.Services.Inventory.Brands;
using MyfinII.Models.Invetory.Categories;
using MyfinII.Services.Inventory.Categories;

namespace MyfinII.Controllers;

public static class InventoryItemEndpoints
{
    public static void MapInventoryItemEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/InventoryItem").WithTags(nameof(InventoryItem));

        group.MapGet("/", async (MyfinIIContext db) =>
        {
            return await db.InventoryItems.ToListAsync();
        })
        .WithName("GetAllInventoryItems")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<InventoryItem>, NotFound>> (Guid id, MyfinIIContext db) =>
        {
            return await db.InventoryItems.AsNoTracking()
                .FirstOrDefaultAsync(model => model.Id == id)
                is InventoryItem model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetInventoryItemById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (Guid id, InventoryItem inventoryItem, MyfinIIContext db) =>
        {
            var affected = await db.InventoryItems
                .Where(model => model.Id == id)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(m => m.Id, inventoryItem.Id)
                    .SetProperty(m => m.SKU, inventoryItem.SKU)
                    .SetProperty(m => m.Name, inventoryItem.Name)
                    .SetProperty(m => m.Unit, inventoryItem.Unit)
                    .SetProperty(m => m.UnitCount, inventoryItem.UnitCount)
                    .SetProperty(m => m.Category, inventoryItem.Category)
                    );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateInventoryItem")
        .WithOpenApi();

        group.MapPost("/", async (InventoryItem inventoryItem, MyfinIIContext db) =>
        {
            return TypedResults.Created($"/api/InventoryItem/{inventoryItem.Id}", await new InventoryItemService(db)
                .SetInventoryItem(inventoryItem)
                .SaveChangesAsync());
        })
        .WithName("CreateInventoryItem")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (Guid id, MyfinIIContext db) =>
        {
            var affected = await db.InventoryItems
                .Where(model => model.Id == id)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteInventoryItem")
        .WithOpenApi();

        group.MapGet("/Brands", async Task<Results<Ok<IEnumerable<Brand>>, NotFound>> (MyfinIIContext db) =>
        {
            return TypedResults.Ok(await new BrandService(db).ListBrands());
        })
        .WithName("ListBrands")
        .WithOpenApi();

        group.MapPost("/Brand", async Task<Results<Ok<Brand>, NotFound>> (Brand brand, MyfinIIContext db) =>
        {
            return TypedResults.Ok(await new BrandService(db).AddBrand(brand));
        })
        .WithName("CreateBrand")
        .WithOpenApi();
        /*
         * Categories
         */

        group.MapGet("/Categories", async Task<Results<Ok<IEnumerable<InventoryCategory>>, NotFound>> (MyfinIIContext db)
            => TypedResults.Ok(await new InventoryCategoryService(db).ListCategories())
        )
        .WithName("ListCategories")
        .WithOpenApi();

        group.MapPost("/Category", async Task<Results<Ok<InventoryCategory>, NotFound>> (InventoryCategory category, MyfinIIContext db) =>
            TypedResults.Ok(await new InventoryCategoryService(db).AddCategory(category))
        )
        .WithName("CreateCategory")
        .WithOpenApi();
    }
}
