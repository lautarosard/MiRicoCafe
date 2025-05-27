using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IItemCarrito;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Querys
{
    public class ItemCarritoQuery : IItemCarritoQuery
    {
        private readonly CafeDbContext _context;

        public ItemCarritoQuery(CafeDbContext context)
        {
            _context = context;
        }

        Task<List<ItemCarrito?>> ObtenerItemsDelCarrito(int clienteId)
        {
            return await _context.Clientes
            .Where(c => c.Id == clienteId)
            .SelectMany(c => c.Carrito)
            .Include(i => i.Producto)
            .ToListAsync();
        }
        Task<ItemCarrito?> ObtenerItemEspecifico(int clienteId, int productoId)
        {
            var item = await _context.Clientes
            .Where(c => c.Id == clienteId)
            .SelectMany(c => c.Carrito)
            .Include(i => i.Producto)
            .FirstOrDefaultAsync(i => i.ProductoId == productoId);
             
            if (item == null)
            {
                throw new KeyNotFoundException($"Item no encontrado para cliente {clienteId} y producto {productoId}");
            }
            return item;
        }
        Task<decimal> CalcularTotalCarrito(int clienteId)
        {
            var items = await ObtenerItemsDelCarrito(clienteId);
            return items.Sum(i => i.Producto.Precio * i.Cantidad);
        }
        Task<int> ObtenerCantidadDeItems(int clienteId)
        {
            return await _context.clientes
            .Where(c => c.Id == clienteId)
            .SelectMany(c => c.Carrito)
            .SumAsync(i => i.Cantidad);
        }


    }
}
