using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyfinII.Migrations
{
    /// <inheritdoc />
    public partial class InventoryCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "InventoryItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "InventoryCategory",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CategoryName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryCategory", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InventoryItems_CategoryId",
                table: "InventoryItems",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryItems_InventoryCategory_CategoryId",
                table: "InventoryItems",
                column: "CategoryId",
                principalTable: "InventoryCategory",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InventoryItems_InventoryCategory_CategoryId",
                table: "InventoryItems");

            migrationBuilder.DropTable(
                name: "InventoryCategory");

            migrationBuilder.DropIndex(
                name: "IX_InventoryItems_CategoryId",
                table: "InventoryItems");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "InventoryItems");
        }
    }
}
