using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IProducto;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Querys
{
    public class ProductoQuery: IProductoQuery
    {
        private readonly CafeDbContext _context;

        public ProductoQuery(CafeDbContext context)
        {
            _context = context;
        }

        public List<Producto> GetProductoQuery()
        {
            return _context.productos.ToList();
        }

        public async Task<Producto> GetById(int id)
        {
            return await _context.productos.FindAsync(id);
        }
    }
}
