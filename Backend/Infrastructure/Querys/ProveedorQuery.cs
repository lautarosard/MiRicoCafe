using Aplication.Interfaces.IProveedor;
using Domain.Entities;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Querys
{
    public class ProveedorQuery : IProveedorQuery
    {

        private readonly CafeDbContext _context;

        public ProveedorQuery(CafeDbContext context)
        {
            _context = context;
        }

        public List<Proveedor> GetProveedoresQuery()
        {
            return _context.proveedores.ToList();
        }

        public async Task<Proveedor> GetById(int id)
        {
            return await _context.proveedores.FindAsync(id);
        }

        public Task<Proveedor> GetByCuit(int id)
        {
            throw new NotImplementedException();
        }

        //public async Task<Proveedor> GetByCuit(int id)
        //{
        //    return await _context.proveedores.FindAsync();
        //}
    }
}
