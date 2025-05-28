using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EliminacionFactuProduP2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_productos_facturas_FacturaId",
                table: "productos");

            migrationBuilder.DropForeignKey(
                name: "FK_productos_ordenDeCompras_IdFactura",
                table: "productos");

            migrationBuilder.DropIndex(
                name: "IX_productos_FacturaId",
                table: "productos");

            migrationBuilder.DropIndex(
                name: "IX_productos_IdFactura",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "FacturaId",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "IdFactura",
                table: "productos");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_productos_ordenDeCompras_IdOrdenDeCompra",
                table: "productos");

            migrationBuilder.DropIndex(
                name: "IX_productos_IdOrdenDeCompra",
                table: "productos");

            migrationBuilder.AddColumn<int>(
                name: "FacturaId",
                table: "productos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdFactura",
                table: "productos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_productos_FacturaId",
                table: "productos",
                column: "FacturaId");

            migrationBuilder.CreateIndex(
                name: "IX_productos_IdFactura",
                table: "productos",
                column: "IdFactura");

            migrationBuilder.AddForeignKey(
                name: "FK_productos_facturas_FacturaId",
                table: "productos",
                column: "FacturaId",
                principalTable: "facturas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_productos_ordenDeCompras_IdFactura",
                table: "productos",
                column: "IdFactura",
                principalTable: "ordenDeCompras",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
