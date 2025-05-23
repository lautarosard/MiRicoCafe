using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IND
{
    public interface INDQuery
    {
        List<NotaDeDebito> GetOrdenDeCompraQuery();
        Task<NotaDeDebito> GetById(int id);
    }
}
