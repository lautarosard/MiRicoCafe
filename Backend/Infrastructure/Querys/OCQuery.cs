using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IOC;
using Domain.Entities;
using Infrastructure.Data;

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
            return _context.ordenDeCompras.ToList();
        }

        public async Task<OrdenDeCompra> GetById(int id)
        {
            return await _context.ordenDeCompras.FindAsync(id);
        }
    }
}
