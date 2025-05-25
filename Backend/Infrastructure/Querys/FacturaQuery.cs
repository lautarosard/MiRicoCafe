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

        public List<Factura> GetFacturaQuery()
        {
            return _context.facturas.ToList();
        }

        public async Task<Factura> GetById(int id)
        {
            //var project = await _context.Set<Factura>()
            //   .Include(p => p.)


            return await _context.facturas.FindAsync(id);
        }
    }
}
