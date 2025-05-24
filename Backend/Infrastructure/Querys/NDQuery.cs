using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IND;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Querys
{
    public class NDQuery : INDQuery
    {
        private readonly CafeDbContext _context;

        public NDQuery(CafeDbContext context)
        {
            _context = context;
        }

        public List<NotaDeDebito> GetNotaDeDebitoQuery()
        {
            return _context.notaDeDebitos.ToList();
        }

        public async Task<NotaDeDebito> GetById(int id)
        {
            return await _context.notaDeDebitos.FindAsync(id);
        }
    }
}
