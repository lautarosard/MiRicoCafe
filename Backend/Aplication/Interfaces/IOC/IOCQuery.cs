using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IOC
{
    public interface IOCQuery
    {
        List<OrdenDeCompra> GetOrdenDeCompraQuery();
        Task<OrdenDeCompra> GetById(int id);
    }
}
