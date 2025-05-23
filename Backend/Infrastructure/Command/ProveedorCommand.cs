using Aplication.Interfaces.IProveedor;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Command
{
    public class ProveedorCommand : IProveedorCommand
    {
        private readonly CafeDbContext _context;

        public ProveedorCommand(CafeDbContext context)
        {
            _context = context;
        }


        public async Task InsertProveedores(Proveedor proveedor)
        {
            _context.Add( proveedor);

            await _context.SaveChangesAsync();
        }

        public async Task RemoveProveedores(Proveedor proveedor)
        {
            _context.Remove(proveedor);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateProveedores(Proveedor proveedor)
        {
            //proveedores para afectar a ese tabla
            _context.proveedores.Update(proveedor);

            await _context.SaveChangesAsync();
        }

    }
}
