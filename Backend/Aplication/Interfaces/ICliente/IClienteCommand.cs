using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.ICliente
{
    public interface IClienteCommand
    {
        Task InsertCliente(Cliente cliente);
        Task RemoveCliente(Cliente cliente);
        Task UpdateCliente(Cliente cliente);

        Task AgregarAlCarrito(Producto Producto);
    }
}
