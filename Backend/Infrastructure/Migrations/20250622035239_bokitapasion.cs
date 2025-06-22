using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class bokitapasion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FacturaItem_facturas_Id",
                table: "FacturaItem");

            migrationBuilder.DropForeignKey(
                name: "FK_FacturaItem_productos_ProductoId",
                table: "FacturaItem");

            migrationBuilder.DropIndex(
                name: "IX_FacturaItem_ProductoId",
                table: "FacturaItem");

            migrationBuilder.AddColumn<string>(
                name: "Rol",
                table: "usuarios",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "FacturaItem",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.CreateIndex(
                name: "IX_FacturaItem_FacturaId",
                table: "FacturaItem",
                column: "FacturaId");

            migrationBuilder.CreateIndex(
                name: "IX_FacturaItem_ProductoId",
                table: "FacturaItem",
                column: "ProductoId");

            migrationBuilder.AddForeignKey(
                name: "FK_FacturaItem_facturas_FacturaId",
                table: "FacturaItem",
                column: "FacturaId",
                principalTable: "facturas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FacturaItem_productos_ProductoId",
                table: "FacturaItem",
                column: "ProductoId",
                principalTable: "productos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FacturaItem_facturas_FacturaId",
                table: "FacturaItem");

            migrationBuilder.DropForeignKey(
                name: "FK_FacturaItem_productos_ProductoId",
                table: "FacturaItem");

            migrationBuilder.DropIndex(
                name: "IX_FacturaItem_FacturaId",
                table: "FacturaItem");

            migrationBuilder.DropIndex(
                name: "IX_FacturaItem_ProductoId",
                table: "FacturaItem");

            migrationBuilder.DropColumn(
                name: "Rol",
                table: "usuarios");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "FacturaItem",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.CreateIndex(
                name: "IX_FacturaItem_ProductoId",
                table: "FacturaItem",
                column: "ProductoId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FacturaItem_facturas_Id",
                table: "FacturaItem",
                column: "Id",
                principalTable: "facturas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FacturaItem_productos_ProductoId",
                table: "FacturaItem",
                column: "ProductoId",
                principalTable: "productos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
