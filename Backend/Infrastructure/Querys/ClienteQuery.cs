using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.ICliente;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Querys
{
    public class ClienteQuery : IClienteQuery
    {
        private readonly CafeDbContext _context;

        public ClienteQuery(CafeDbContext context)
        {
            _context = context;
        }

        public List<Cliente> GetClienteQuery()
        {
            return _context.clientes.ToList();
        }

        public async Task<Cliente> GetById(int id)
        {
            return await _context.clientes.FindAsync(id);
        }
    }
}
