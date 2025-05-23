using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IOC
{
    public interface IOCCommand
    {
        Task InsertOrdenDeCompra(OrdenDeCompra ordenDeCompra);
        Task RemoveOrdenDeCompra(OrdenDeCompra ordenDeCompra);
        Task UpdateOrdenDeCompra(OrdenDeCompra ordenDeCompra);
    }
}
