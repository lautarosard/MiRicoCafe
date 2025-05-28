using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EliminacionFactuProdu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_productos_facturas_IdFactura",
                table: "productos");

            migrationBuilder.AddColumn<int>(
                name: "FacturaId",
                table: "productos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_productos_FacturaId",
                table: "productos",
                column: "FacturaId");

            migrationBuilder.AddForeignKey(
                name: "FK_productos_facturas_FacturaId",
                table: "productos",
                column: "FacturaId",
                principalTable: "facturas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_productos_facturas_FacturaId",
                table: "productos");

            migrationBuilder.DropIndex(
                name: "IX_productos_FacturaId",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "FacturaId",
                table: "productos");

            migrationBuilder.AddForeignKey(
                name: "FK_productos_facturas_IdFactura",
                table: "productos",
                column: "IdFactura",
                principalTable: "facturas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
