using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IND;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Command
{
    public class NDCommand: INDCommand
    {
        private readonly CafeDbContext _context;

        public NDCommand(CafeDbContext context)
        {
            _context = context;
        }

        public async Task InsertNotaDeDebito(NotaDeDebito notaDeDebito)
        {
            _context.Add(notaDeDebito);

            await _context.SaveChangesAsync();
        }

        public async Task RemoveNotaDeDebito(NotaDeDebito notaDeDebito)
        {
            _context.Remove(notaDeDebito);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateNotaDeDebito(NotaDeDebito notaDeDebito)
        {
            //NCC para afectar a ese tabla
            _context.notaDeDebitos.Update(notaDeDebito);

            await _context.SaveChangesAsync();
        }
    }
}
