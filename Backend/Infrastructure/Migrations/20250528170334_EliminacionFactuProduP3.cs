using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EliminacionFactuProduP3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_productos_ordenDeCompras_IdOrdenDeCompra",
                table: "productos");

            migrationBuilder.DropIndex(
                name: "IX_productos_IdOrdenDeCompra",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "IdOrdenDeCompra",
                table: "productos");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdOrdenDeCompra",
                table: "productos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_productos_IdOrdenDeCompra",
                table: "productos",
                column: "IdOrdenDeCompra");

            migrationBuilder.AddForeignKey(
                name: "FK_productos_ordenDeCompras_IdOrdenDeCompra",
                table: "productos",
                column: "IdOrdenDeCompra",
                principalTable: "ordenDeCompras",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
