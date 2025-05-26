using Aplication.Interfaces.IUsuario;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Querys
{
    public class UsuarioQuery : IUsuarioQuery
    {
        private readonly CafeDbContext _context;

        public UsuarioQuery(CafeDbContext context)
        {
            _context = context;
        }

        public List<Usuario> GetUsuarioQuery()
        {
            return _context.usuarios.ToList();
        }

        public async Task<Usuario> GetById(int id)
        {
            return await _context.usuarios.FindAsync(id);
        }

        public async Task<Usuario> GetByUsuario(string usuario)
        {
            return await _context.usuarios
                .Include(u => u.Cliente)
                .FirstOrDefaultAsync(o => o.Username == usuario);
        }
    }
}
