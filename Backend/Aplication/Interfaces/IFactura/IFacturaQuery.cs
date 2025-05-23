using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IFactura
{
    public interface IFacturaQuery
    {
        List<Factura> GetOrdenDeCompraQuery();
        Task<Factura> GetById(int id);
    }
}
