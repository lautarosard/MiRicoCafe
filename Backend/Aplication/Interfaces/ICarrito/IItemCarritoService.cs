using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Models.Request;
using Aplication.Models.Response;

namespace Aplication.Interfaces.IAdministrador
{
    public interface IItemCarritoService
    {
        Task<CarritoResponse> ObtenerCarrito(int clienteId);
        Task AgregarItem(int clienteId, ItemCarritoRequest request);
        Task ActualizarCantidad(int clienteId, int productoId, int cantidad);
        Task EliminarItem(int clienteId, int productoId);
        Task VaciarCarrito(int clienteId);
    }
}
