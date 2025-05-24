using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.INC
{
    public interface INCCommand
    {
        Task InsertNotaDeCredito(NotaDeCredito notaDeCredito);
        Task RemoveNotaDeCredito(NotaDeCredito notaDeCredito);
        Task UpdateNotaDeCredito(NotaDeCredito notaDeCredito);
    }
}
