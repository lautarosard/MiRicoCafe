using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.ICliente;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Command
{
    public class ClienteCommand : IClienteCommand
    {
        private readonly CafeDbContext _context;

        public ClienteCommand(CafeDbContext context)
        {
            _context = context;
        }


        public async Task InsertCliente(Cliente cliente)
        {
            _context.Add(cliente);

            await _context.SaveChangesAsync();
        }

        public async Task RemoveCliente(Cliente cliente)
        {
            _context.Remove(cliente);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateCliente(Cliente cliente)
        {
            //proveedores para afectar a ese tabla
            _context.clientes.Update(cliente);

            await _context.SaveChangesAsync();
        }
    }
}
