using Aplication.Exceptions;
using Aplication.Interfaces.IAdministrador;
using Aplication.Interfaces.ICliente;
using Aplication.Interfaces.IItemCarrito;
using Aplication.Interfaces.IProducto;
using Aplication.Models.Request;
using Domain.Entities;
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
        private readonly IClienteQuery _clienteQuery;
        private readonly IProductoQuery _productoQuery;

        public ItemCarritoService(IItemCarritoCommand command, IItemCarritoQuery query, IClienteQuery clienteQuery, IProductoQuery productoQuery)
        {
            _command = command;
            _query = query;
            _clienteQuery = clienteQuery;
            _productoQuery = productoQuery;
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


        public async Task CobrarCarrito(int clienteId)
        {
            //Busca el Cliente 
            var cliente = await _clienteQuery.GetById(clienteId);

            //Verificamos 
            if (cliente == null)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }

            if (clienteId <= 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }

            //generamos las listas donde se van a guardar los request 
            List<FacturaItemRequest> ListaDeFacturaItemRequest= new List<FacturaItemRequest>();
            List<ProductoMPRequest> ListaDeProductoMPRequest = new List<ProductoMPRequest>();


            //tiramos los mapeamos todo 
            foreach (ItemCarrito item in cliente.Carrito)
            {
                //Creamo un factura item y buscamo el producto que le pusimos
                FacturaItemRequest FacturaItemDentroDeLista = new FacturaItemRequest();
                ProductoMPRequest ProductoMPRequestDeLista = new ProductoMPRequest();
                var Producto = await _productoQuery.GetById(item.ProductoId);

                //Mapeamos
                FacturaItemDentroDeLista.Cantidad = item.Cantidad;
                FacturaItemDentroDeLista.ProductoId = item.ProductoId;
                FacturaItemDentroDeLista.PrecioUnitario = Producto.Precio;
                
                ProductoMPRequestDeLista.ProductoId = item.ProductoId;
                ProductoMPRequestDeLista.Titulo=Producto.Nombre;
                ProductoMPRequestDeLista.Cantidad=item.Cantidad;
                ProductoMPRequestDeLista.Precio=Producto.Precio;
                //Agregamos a la lista
                ListaDeFacturaItemRequest.Add(FacturaItemDentroDeLista);
                ListaDeProductoMPRequest.Add(ProductoMPRequestDeLista);
            }







        }







    }
}
