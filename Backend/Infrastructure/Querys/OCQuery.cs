using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IOC;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Querys
{
    public class OCQuery : IOCQuery
    {
        private readonly CafeDbContext _context;

        public OCQuery(CafeDbContext context)
        {
            _context = context;
        }

        public List<OrdenDeCompra> GetOrdenDeCompraQuery()
        {
            return _context.ordenDeCompras
                .Include(oc => oc.Proveedor)
                .Include(oc => oc.DetalleOrdenDeCompra)
                .ThenInclude(item => item.Producto)
                .ToList();
        }

        public async Task<OrdenDeCompra> GetById(int id)
        {
            var ordenDeCompra = await _context.Set<OrdenDeCompra>()
               .Include(p => p.Proveedor)
               .Include(oc => oc.DetalleOrdenDeCompra)
               .ThenInclude(item => item.Producto)
           

               .FirstOrDefaultAsync(p => p.Id == id);

            return ordenDeCompra;
        }
    }
}
