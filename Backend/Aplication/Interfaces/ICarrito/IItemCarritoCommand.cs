using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IItemCarrito
{
    public interface IItemCarritoCommand
    {
        Task AgregarItemAsync(int clienteId, int productoId, int cantidad);
        Task ActualizarCantidad(int clienteId, int productoId, int nuevaCantidad);
        Task EliminarItemDelCarrito(int clienteId, int productoId);
        Task VaciarCarrito(int clienteId);
    }
}

