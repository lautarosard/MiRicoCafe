using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IND
{
    public interface INDCommand
    {
        Task InsertNotaDeDebito(NotaDeDebito notaDeDebito);
        Task RemoveNotaDeDebito(NotaDeDebito notaDeDebito);
        //Task UpdateNotaDeDebito(NotaDeDebito notaDeDebito);
    }
}
