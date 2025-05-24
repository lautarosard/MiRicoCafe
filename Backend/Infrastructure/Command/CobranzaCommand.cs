using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.ICobranza;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Command
{
    public class CobranzaCommand: ICobranzaCommand
    {
        private readonly CafeDbContext _context;

        public CobranzaCommand(CafeDbContext context)
        {
            _context = context;
        }


        public async Task InsertCobranza(Cobranza cobranza)
        {
            _context.Add(cobranza);

            await _context.SaveChangesAsync();
        }

        public async Task RemoveCobranza(Cobranza cobranza)
        {
            _context.Remove(cobranza);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateCobranza(Cobranza cobranza)
        {
            //proveedores para afectar a ese tabla
            _context.cobranzas.Update(cobranza);

            await _context.SaveChangesAsync();
        }
    }
}
