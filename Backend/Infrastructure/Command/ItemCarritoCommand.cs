using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IItemCarrito;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Command
{
    public class ItemCarritoCommand : IItemCarritoCommand
    {
        private readonly CafeDbContext _context;

        public ItemCarritoCommand(CafeDbContext context)
        {
            _context = context;
        }


        public async Task AgregarItemAsync(int clienteId, int productoId, int cantidad)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                 var cliente = await _context.clientes
                     .Include(c => c.Carrito)
                     .FirstOrDefaultAsync(c => c.Id == clienteId);

                 if (cliente == null)
                     throw new KeyNotFoundException("Cliente no existe");

                 var producto = await _context.productos.FindAsync(productoId);
                 if (producto == null)
                     throw new KeyNotFoundException("Producto no existe");

                 if (producto.Stock < cantidad)
                     throw new InvalidOperationException($"Stock insuficiente. Disponible: {producto.Stock}");

                 var itemExistente = cliente.Carrito.FirstOrDefault(i => i.ProductoId == productoId);

                 if (itemExistente != null)
                 {
                     itemExistente.Cantidad += cantidad;
                 }
                 else
                 {
                     cliente.Carrito.Add(new ItemCarrito
                     {
                         ProductoId = productoId,
                         Cantidad = cantidad,
                         Producto = producto
                     });
                 }

                 producto.Stock -= cantidad;
                 await _context.SaveChangesAsync();
                 await transaction.CommitAsync();
             }
             catch
             {
                 await transaction.RollbackAsync();
                 throw;
             }

        }

        public async Task ActualizarCantidad(int clienteId, int productoId, int nuevaCantidad)
        {
            if (nuevaCantidad <= 0)
            {
                throw new ArgumentException("La cantidad debe ser mayor a cero");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
    
            try
            {
                var item = await _context.itemCarritos
                    .Include(i => i.Producto)
                    .FirstOrDefaultAsync(i => 
                        i.ClienteId == clienteId && 
                        i.ProductoId == productoId);

                if (item == null)
                    throw new KeyNotFoundException("Ítem no encontrado en carrito");

                var diferencia = nuevaCantidad - item.Cantidad;

                // Validar stock si estamos aumentando la cantidad
                if (diferencia > 0 && item.Producto.Stock < diferencia)
                {
                    throw new InvalidOperationException(
                        $"Stock insuficiente. Disponible: {item.Producto.Stock}, Necesario: {diferencia}");
                }
            
                // Actualizar valores
                item.Cantidad = nuevaCantidad;
                item.Producto.Stock -= diferencia;

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task EliminarItemDelCarrito(int clienteId, int productoId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
    
            try
            {
                var item = await _context.itemCarritos
                    .Include(i => i.Producto)
                    .FirstOrDefaultAsync(i => 
                        i.ClienteId == clienteId && 
                        i.ProductoId == productoId);
                if (item == null)
                    return; // O podrías lanzar excepción

                // Devolver stock
                item.Producto.Stock += item.Cantidad;

                // Eliminar ítem
                _context.itemCarritos.Remove(item);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }

        }

        public async Task VaciarCarrito(int clienteId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
    
            try
            {
                var items = await _context.itemCarritos
                    .Include(i => i.Producto)
                    .Where(i => i.ClienteId == clienteId)
                    .ToListAsync();

                if (!items.Any())
                    return;

                // Devolver stock de todos los items
                foreach (var item in items)
                {
                    item.Producto.Stock += item.Cantidad;
                }

                // Eliminar todos los items
                _context.itemCarritos.RemoveRange(items);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }

        }
    }
}
