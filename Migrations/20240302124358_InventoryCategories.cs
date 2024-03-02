using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyfinII.Migrations
{
    /// <inheritdoc />
    public partial class InventoryCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InventoryItems_InventoryCategory_CategoryId",
                table: "InventoryItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InventoryCategory",
                table: "InventoryCategory");

            migrationBuilder.RenameTable(
                name: "InventoryCategory",
                newName: "InventoryCategories");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InventoryCategories",
                table: "InventoryCategories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryItems_InventoryCategories_CategoryId",
                table: "InventoryItems",
                column: "CategoryId",
                principalTable: "InventoryCategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InventoryItems_InventoryCategories_CategoryId",
                table: "InventoryItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InventoryCategories",
                table: "InventoryCategories");

            migrationBuilder.RenameTable(
                name: "InventoryCategories",
                newName: "InventoryCategory");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InventoryCategory",
                table: "InventoryCategory",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryItems_InventoryCategory_CategoryId",
                table: "InventoryItems",
                column: "CategoryId",
                principalTable: "InventoryCategory",
                principalColumn: "Id");
        }
    }
}
