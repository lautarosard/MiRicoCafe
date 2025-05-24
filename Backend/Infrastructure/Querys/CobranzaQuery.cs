using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.ICobranza;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Querys
{
    public class CobranzaQuery : ICobranzaQuery
    {
        private readonly CafeDbContext _context;

        public CobranzaQuery(CafeDbContext context)
        {
            _context = context;
        }

        public List<Cobranza> GetCobranzaQuery()
        {
            return _context.cobranzas.ToList();
        }

        public async Task<Cobranza> GetById(int id)
        {
            return await _context.cobranzas.FindAsync(id);
        }
    }
}
