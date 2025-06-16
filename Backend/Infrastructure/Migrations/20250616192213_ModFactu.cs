using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ModFactu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_facturas_cobranzas_IdCobranza",
                table: "facturas");

            migrationBuilder.DropForeignKey(
                name: "FK_notaDeCreditos_facturas_IdFactura",
                table: "notaDeCreditos");

            migrationBuilder.DropForeignKey(
                name: "FK_notaDeDebitos_facturas_IdFactura",
                table: "notaDeDebitos");

            migrationBuilder.DropIndex(
                name: "IX_notaDeDebitos_IdFactura",
                table: "notaDeDebitos");

            migrationBuilder.DropIndex(
                name: "IX_notaDeCreditos_IdFactura",
                table: "notaDeCreditos");

            migrationBuilder.DropIndex(
                name: "IX_facturas_IdCobranza",
                table: "facturas");

            migrationBuilder.DropColumn(
                name: "IdFactura",
                table: "notaDeDebitos");

            migrationBuilder.DropColumn(
                name: "IdFactura",
                table: "notaDeCreditos");

            migrationBuilder.DropColumn(
                name: "CUILCliente",
                table: "facturas");

            migrationBuilder.DropColumn(
                name: "DireccionCliente",
                table: "facturas");

            migrationBuilder.DropColumn(
                name: "FechaVencimiento",
                table: "facturas");

            migrationBuilder.DropColumn(
                name: "IVA",
                table: "facturas");

            migrationBuilder.DropColumn(
                name: "IdCobranza",
                table: "facturas");

            migrationBuilder.DropColumn(
                name: "Importe",
                table: "facturas");

            migrationBuilder.DropColumn(
                name: "LocalidadCliente",
                table: "facturas");

            migrationBuilder.DropColumn(
                name: "NombreCliente",
                table: "facturas");

            migrationBuilder.AddColumn<bool>(
                name: "Estado",
                table: "facturas",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "FacturaItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    FacturaId = table.Column<int>(type: "int", nullable: false),
                    ProductoId = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    PrecioUnitario = table.Column<decimal>(type: "decimal(65,30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FacturaItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FacturaItem_facturas_Id",
                        column: x => x.Id,
                        principalTable: "facturas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FacturaItem_productos_ProductoId",
                        column: x => x.ProductoId,
                        principalTable: "productos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FacturaItem_ProductoId",
                table: "FacturaItem",
                column: "ProductoId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FacturaItem");

            migrationBuilder.DropColumn(
                name: "Estado",
                table: "facturas");

            migrationBuilder.AddColumn<int>(
                name: "IdFactura",
                table: "notaDeDebitos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdFactura",
                table: "notaDeCreditos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CUILCliente",
                table: "facturas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "DireccionCliente",
                table: "facturas",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaVencimiento",
                table: "facturas",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<float>(
                name: "IVA",
                table: "facturas",
                type: "float",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "IdCobranza",
                table: "facturas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "Importe",
                table: "facturas",
                type: "float",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "LocalidadCliente",
                table: "facturas",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "NombreCliente",
                table: "facturas",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_notaDeDebitos_IdFactura",
                table: "notaDeDebitos",
                column: "IdFactura",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_notaDeCreditos_IdFactura",
                table: "notaDeCreditos",
                column: "IdFactura",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_facturas_IdCobranza",
                table: "facturas",
                column: "IdCobranza",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_facturas_cobranzas_IdCobranza",
                table: "facturas",
                column: "IdCobranza",
                principalTable: "cobranzas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_notaDeCreditos_facturas_IdFactura",
                table: "notaDeCreditos",
                column: "IdFactura",
                principalTable: "facturas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_notaDeDebitos_facturas_IdFactura",
                table: "notaDeDebitos",
                column: "IdFactura",
                principalTable: "facturas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
