using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IFactura;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Querys
{
    public class FacturaQuery : IFacturaQuery
    {
        private readonly CafeDbContext _context;

        public FacturaQuery(CafeDbContext context)
        {
            _context = context;
        }

        public  List<Factura> GetFacturaQuery()
        {
            return  _context.facturas.Include(oc => oc.Cliente)
                .Include(oc => oc.Detalles)
                .ThenInclude(item => item.Producto)
                .ToList();
        }

        public async Task<Factura> GetById(int id)
        {
            //var project = await _context.Set<Factura>()
            //   .Include(p => p.)


            return await _context.facturas.Include(f => f.Cliente)         // Incluye los datos del Cliente
                         .Include(f => f.Detalles)        // Incluye la colección de Detalles de la factura
                            .ThenInclude(d => d.Producto) // Luego, dentro de Detalles, incluye el Producto
                         .FirstOrDefaultAsync(f => f.Id == id);
        }
    }
}
