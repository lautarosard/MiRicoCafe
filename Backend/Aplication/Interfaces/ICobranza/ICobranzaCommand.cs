using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.ICobranza
{
    public interface ICobranzaCommand
    {
        Task InsertCobranza(Cobranza cobranza);
        Task RemoveCobranza(Cobranza cobranza);
        Task UpdateCobranza(Cobranza cobranza);
    }
}
