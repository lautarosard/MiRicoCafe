using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.INC;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Querys
{
    public class NCQuery :INCQuery
    {
        private readonly CafeDbContext _context;

        public NCQuery(CafeDbContext context)
        {
            _context = context;
        }

        public List<NotaDeCredito> GetNotaDeCreditoQuery()
        {
            return _context.notaDeCreditos.ToList();
        }

        public async Task<NotaDeCredito> GetById(int id)
        {
            return await _context.notaDeCreditos.FindAsync(id);
        }
    }
}
