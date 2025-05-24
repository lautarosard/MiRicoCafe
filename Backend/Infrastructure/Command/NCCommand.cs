using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.INC;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Command
{
    public class NCCommand: INCCommand
    {
        
        private readonly CafeDbContext _context;

        public NCCommand(CafeDbContext context)
        {
            _context = context;
        }

        public async Task InsertNotaDeCredito(NotaDeCredito notaDeCredito)
        {
            _context.Add(notaDeCredito);

            await _context.SaveChangesAsync();
        }

        public async Task RemoveNotaDeCredito(NotaDeCredito notaDeCredito)
        {
            _context.Remove(notaDeCredito);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateNotaDeCredito(NotaDeCredito notaDeCredito)
        {
            //NCC para afectar a ese tabla
            _context.notaDeCreditos.Update(notaDeCredito);

            await _context.SaveChangesAsync();
        }
    }
}
