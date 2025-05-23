using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.INC
{
    public interface INCQuery
    {
        List<NotaDeCredito> GetOrdenDeCompraQuery();
        Task<NotaDeCredito> GetById(int id);
    }
}
