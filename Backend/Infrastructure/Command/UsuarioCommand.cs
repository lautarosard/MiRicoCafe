using Aplication.Interfaces.IUsuario;
using Domain.Entities;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Command
{
    public class UsuarioCommand : IUsuarioCommand
    {
        private readonly CafeDbContext _context;

        public UsuarioCommand(CafeDbContext context)
        {
            _context = context;
        }


        public async Task InsertUsuario(Usuario Usuario)
        {
            _context.Add(Usuario);

            await _context.SaveChangesAsync();
        }

        public async Task RemoveUsuario(Usuario Usuario)
        {
            _context.Remove(Usuario);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateUsuario(Usuario Usuario)
        {
            //proveedores para afectar a ese tabla
            _context.usuarios.Update(Usuario);

            await _context.SaveChangesAsync();
        }
    }
}
