﻿using Domain.Entities;
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

        //Cliente
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Cliente
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Nombre).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(255).IsRequired();
                
            });

            modelBuilder.Entity<Cobranza>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Descripcion).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Fecha).IsRequired();

            });
            modelBuilder.Entity<Factura>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Id).ValueGeneratedOnAdd();
                entity.Property(n => n.FechaEmision).IsRequired();
                entity.Property(e => e.Total).IsRequired();
                entity.Property(e => e.Importe).IsRequired();
                entity.Property(e => e.IVA).IsRequired();
                entity.Property(e => e.FechaVencimiento).IsRequired();

            });

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

            modelBuilder.Entity<OrdenDeCompra>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Id).ValueGeneratedOnAdd();
                entity.Property(n => n.Fecha).IsRequired();
                entity.Property(e => e.Cantidad).IsRequired();
                entity.Property(e => e.Detalle).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Total).IsRequired();

            });

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

            modelBuilder.Entity<Proveedor>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(n => n.Id).ValueGeneratedOnAdd();
                entity.Property(n => n.Nombre).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(255).IsRequired();
                entity.Property(e => e.CUIT).IsRequired();
                entity.Property(e => e.Provincia).HasMaxLength(50).IsRequired();
                entity.Property(e => e.Localidad).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Direccion).HasMaxLength(255).IsRequired();

            });

            //Relacion 1-X Cliente-Factura
            modelBuilder.Entity<Factura>()
            .HasOne<Cliente>(s => s.Cliente)
            .WithMany(g => g.Facturas)
            .HasForeignKey(s => s.IdCliente);
            
            //Relacion 1-X OrdenDeCompra-Producto
            modelBuilder.Entity<Producto>()
            .HasOne<OrdenDeCompra>(s => s.OrdenDeCompra)
            .WithMany(g => g.Productos)
            .HasForeignKey(s => s.IdFactura);

            //Relacion 1-X Producto-Factura
            modelBuilder.Entity<Producto>()
            .HasOne<Factura>(s => s.Factura)
            .WithMany(g => g.Productos)
            .HasForeignKey(s => s.IdFactura);

            //Relacion 1-1 OrdenDeCompra-Proveedor
            modelBuilder.Entity<Proveedor>()
            .HasOne<OrdenDeCompra>(s => s.OrdenDeCompra)
            .WithOne(ad => ad.Proveedor)
            .HasForeignKey<OrdenDeCompra>(ad => ad.IdProveedor);

            //Relacion 1-1 Factura-Cobranza
            modelBuilder.Entity<Cobranza>()
            .HasOne<Factura>(s => s.Factura)
            .WithOne(ad => ad.Cobranza)
            .HasForeignKey<Factura>(ad => ad.IdCobranza);

            //Relacion 1-1 NotaDeCredito-Factura
            modelBuilder.Entity<Factura>()
            .HasOne<NotaDeCredito>(s => s.NotaDeCredito)
            .WithOne(ad => ad.Factura)
            .HasForeignKey<NotaDeCredito>(ad => ad.IdFactura);

            //Relacion 1-1 NotaDeDebito-Factura
            modelBuilder.Entity<Factura>()
            .HasOne<NotaDeDebito>(s => s.NotaDebito)
            .WithOne(ad => ad.Factura)
            .HasForeignKey<NotaDeDebito>(ad => ad.IdFactura);
        }

    }
}
