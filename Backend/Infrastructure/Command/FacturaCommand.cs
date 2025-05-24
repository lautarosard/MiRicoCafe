using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IFactura;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Command
{
    public class FacturaCommand: IFacturaCommand
    {
        
        private readonly CafeDbContext _context;

        public FacturaCommand(CafeDbContext context)
        {
            _context = context;
        }

        public async Task InsertFactura(Factura factura)
        {
            _context.Add(factura);

            await _context.SaveChangesAsync();
        }

        public async Task RemoveFactura(Factura factura)
        {
            _context.Remove(factura);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateFactura(Factura factura)
        {
            //proveedores para afectar a ese tabla
            _context.facturas.Update(factura);

            await _context.SaveChangesAsync();
        }
    }
}
