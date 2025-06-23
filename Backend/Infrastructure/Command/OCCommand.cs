using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IOC;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Command
{
    public class OCCommand: IOCCommand
    {

        private readonly CafeDbContext _context;

        public OCCommand(CafeDbContext context)
        {
            _context = context;
        }

        public Task CargarProducto(OrdenDeCompra ordenDeCompra)
        {
            throw new NotImplementedException();
        }

        public async Task InsertOrdenDeCompra(OrdenDeCompra occ)
        {
            //if (occ.Proveedor != null)
            //{
            //    _context.Attach(occ.Proveedor);
            //}

            foreach (var item in occ.DetalleOrdenDeCompra)
            {
                if (item.Producto != null)
                {
                    _context.Attach(item.Producto);
                }
            }
            await _context.ordenDeCompras.AddAsync(occ);

            await _context.SaveChangesAsync();
        }

        public async Task RemoveOrdenDeCompra(OrdenDeCompra occ)
        {
            _context.Remove(occ);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrdenDeCompra(OrdenDeCompra occ)
        {
            //NCC para afectar a ese tabla
            _context.ordenDeCompras.Update(occ);

            await _context.SaveChangesAsync();
        }        
    }
}
