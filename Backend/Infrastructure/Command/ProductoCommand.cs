using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IProducto;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Command
{
    public class ProductoCommand: IProductoCommand
    {
        private readonly CafeDbContext _context;

        public ProductoCommand(CafeDbContext context)
        {
            _context = context;
        }

        public async Task InsertProducto(Producto producto)
        {
            _context.Add(producto);

            await _context.SaveChangesAsync();
        }

        public async Task RemoveProducto(Producto producto)
        {
            _context.Remove(producto);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateProducto(Producto producto)
        {
            //NCC para afectar a ese tabla
            _context.productos.Update(producto);

            await _context.SaveChangesAsync();
        }        
    }
}
