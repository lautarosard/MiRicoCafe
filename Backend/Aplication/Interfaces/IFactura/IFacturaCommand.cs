using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IFactura
{
    public interface IFacturaCommand
    {
        Task InsertFactura(Factura factura);
        Task RemoveFactura(Factura factura);
        Task UpdateFactura(Factura factura);
    }
}
