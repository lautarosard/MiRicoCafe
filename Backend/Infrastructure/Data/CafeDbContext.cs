using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class CafeDbContext : DbContext
    {
        public CafeDbContext(DbContextOptions<CafeDbContext> options) : base(options) 
        { 
        
        }
        //Entidades
        public DbSet<Cliente> clientes { get; set; }
        public DbSet<Cobranza> cobranzas { get; set; }
        public DbSet<Factura> facturas { get; set; }
        public DbSet<NotaDeCredito> notaDeCreditos { get; set; }
        public DbSet<NotaDeDebito> notaDeDebitos { get; set; }
        public DbSet<OrdenDeCompra> ordenDeCompras { get; set; }
        public DbSet<Producto> productos { get; set; }
        public DbSet<Proveedor> proveedores { get; set; }
        public DbSet<Usuario> usuarios { get; set; }
        public DbSet<ItemCarrito> itemCarritos { get; set; }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Cliente
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Nombre).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(255).IsRequired();
                
            });
            //Cobranza
            modelBuilder.Entity<Cobranza>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Descripcion).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Fecha).IsRequired();

            });
            //Factura
            modelBuilder.Entity<Factura>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Id).ValueGeneratedOnAdd();
                entity.Property(n => n.FechaEmision).IsRequired();
                entity.Property(e => e.Total).IsRequired();
                

            });
            //Factura
            modelBuilder.Entity<FacturaItem>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Id).ValueGeneratedOnAdd();
            });

            //NotaDeCredito
            modelBuilder.Entity<NotaDeCredito>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Id).ValueGeneratedOnAdd();
                entity.Property(n => n.FechaEmision).IsRequired();
                entity.Property(e => e.Total).IsRequired();
                entity.Property(e => e.Importe).IsRequired();
                entity.Property(e => e.IVA).IsRequired();
                entity.Property(e => e.FechaVencimiento).IsRequired();
                entity.Property(e => e.ValorModificacion).IsRequired();

            });
            //NotaDeDebito
            modelBuilder.Entity<NotaDeDebito>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Id).ValueGeneratedOnAdd();
                entity.Property(n => n.FechaEmision).IsRequired();
                entity.Property(e => e.Total).IsRequired();
                entity.Property(e => e.Importe).IsRequired();
                entity.Property(e => e.IVA).IsRequired();
                entity.Property(e => e.FechaVencimiento).IsRequired();
                entity.Property(e => e.ValorModificacion).IsRequired();

            });
            //OrdenDeCompra
            modelBuilder.Entity<OrdenDeCompra>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Id).ValueGeneratedOnAdd();
                entity.Property(n => n.Fecha).IsRequired();
                entity.Property(e => e.Cantidad).IsRequired();
                entity.Property(e => e.Detalle).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Total).IsRequired();

            });
            //Producto
            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Id).ValueGeneratedOnAdd();
                entity.Property(n => n.Nombre).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Precio).IsRequired();
                entity.Property(e => e.Categoria).IsRequired();
                entity.Property(e => e.Descripcion).HasMaxLength(255);
                entity.Property(e => e.Stock).IsRequired();
               
            });
            //Proveedor
            modelBuilder.Entity<Proveedor>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Id).ValueGeneratedOnAdd();
                entity.Property(n => n.Nombre).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(255).IsRequired();
                entity.Property(e => e.CUIT).IsRequired().HasMaxLength(11);
                entity.Property(e => e.Provincia).HasMaxLength(50).IsRequired();
                entity.Property(e => e.Localidad).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Direccion).HasMaxLength(255).IsRequired();
            });
            //Usuario
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(n => n.Id).ValueGeneratedOnAdd();
                entity.Property(n => n.Username).HasMaxLength(255).IsRequired();
                entity.Property(e => e.PasswordHash).HasMaxLength(255).IsRequired();

            });
            //ItemCarrito
            modelBuilder.Entity<ItemCarrito>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(n => n.Id).ValueGeneratedOnAdd();
            });

            //Relacion 1-X Cliente-Factura
            modelBuilder.Entity<Factura>()
            .HasOne<Cliente>(s => s.Cliente)
            .WithMany(g => g.Facturas)
            .HasForeignKey(s => s.IdCliente);
            

            //Relacion 1-1 OrdenDeCompra-Proveedor
            modelBuilder.Entity<Proveedor>()
            .HasOne<OrdenDeCompra>(s => s.OrdenDeCompra)
            .WithOne(ad => ad.Proveedor)
            .HasForeignKey<OrdenDeCompra>(ad => ad.IdProveedor);

            //Relacion 1-1 Cliente-Usuario
            modelBuilder.Entity<Cliente>()
            .HasOne<Usuario>(s => s.Usuario)
            .WithOne(ad => ad.Cliente)
            .HasForeignKey<Usuario>(ad => ad.ClienteId);

            //Relacion 1-x Cliente- Carrito
            modelBuilder.Entity<ItemCarrito>()
            .HasOne(ic => ic.Cliente)
            .WithMany(c => c.Carrito)
            .HasForeignKey(ic => ic.ClienteId);

            //Relacion 1-x Producto-Carrito
            modelBuilder.Entity<ItemCarrito>()
            .HasOne(ic => ic.Producto)
            .WithMany(p => p.ItemsEnCarrito)
            .HasForeignKey(ic => ic.ProductoId);

            //Relacion 1-x Produc-FacturaItem
            modelBuilder.Entity<FacturaItem>()
            .HasOne(fi => fi.Producto)
            .WithMany(p => p.FacturaItems)  
            .HasForeignKey(fi => fi.ProductoId)
            .OnDelete(DeleteBehavior.Restrict);

            // Relación Factura-FacturaItem (corregida)
            modelBuilder.Entity<FacturaItem>()
                .HasOne(fi => fi.Factura)
                .WithMany(f => f.Detalles)
                .HasForeignKey(fi => fi.FacturaId)
                .OnDelete(DeleteBehavior.Cascade);

        }

    }
}
