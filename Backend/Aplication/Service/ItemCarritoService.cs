using Aplication.Interfaces.IAdministrador;
using Aplication.Interfaces.IItemCarrito;
using Aplication.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Service
{
    public class ItemCarritoService : IItemCarritoService
    {
        private readonly IItemCarritoCommand _command;
        private readonly IItemCarritoQuery _query;

        public ItemCarritoService(IItemCarritoCommand command, IItemCarritoQuery query)
        {
            _command = command;
            _query = query;
        }

        public async Task<CarritoResponse> ObtenerCarrito(int clienteId)
        {
            var items = await _query.ObtenerItemsDelCarrito(clienteId);

            var response = new CarritoResponse
            {
                Success = true,
                Items = items.Select(i => new ItemCarritoResponse
                {
                    Id = i.Id,
                    ProductoId = i.ProductoId,
                    Nombre = i.Producto.Nombre,
                    Precio = i.Producto.Precio,
                    Cantidad = i.Cantidad,
                    Subtotal = i.Producto.Precio * i.Cantidad
                }).ToList()
            };

            response.Total = response.Items.Sum(i => i.Subtotal);
            response.Message = $"Carrito con {response.Items.Count} ítems";

            return response;
        }

        public async Task AgregarItem(int clienteId, ItemCarritoRequest request)
        {
            await _command.AgregarItemAsync(clienteId, request.ProductoId, request.Cantidad);
        }

        public async Task ActualizarCantidad(int clienteId, int productoId, int cantidad)
        {
            await _command.ActualizarCantidad(clienteId, productoId, cantidad);
        }

        public async Task EliminarItem(int clienteId, int productoId)
        {
            await _command.EliminarItemDelCarrito(clienteId, productoId);
        }

        public async Task VaciarCarrito(int clienteId)
        {
            await _command.VaciarCarrito(clienteId);
        }

    }
}
