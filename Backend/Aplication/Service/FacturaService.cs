using Aplication.Exceptions;
using Aplication.Interfaces.ICliente;
using Aplication.Interfaces.ICobranza;
using Aplication.Interfaces.IFactura;
using Aplication.Interfaces.INC;
using Aplication.Interfaces.IProducto;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Service
{
    public class FacturaService: IFacturaService
    {
        private readonly IFacturaQuery _query;
        private readonly IFacturaCommand _command;
        private readonly IClienteQuery clienteQuery;
        private readonly ICobranzaQuery cobranzaQuery;
        private readonly IProductoQuery productoQuery;
        private readonly IProductoCommand _productoCommand;


        public FacturaService
            (IFacturaQuery query, IFacturaCommand command, 
            IClienteQuery clienteQuery, ICobranzaQuery cobranzaQuery, 
            IProductoQuery productoQuery, IProductoCommand productoCommand)
        {
            _query = query;
            _command = command;
            this.clienteQuery = clienteQuery;
            this.cobranzaQuery = cobranzaQuery;
            this.productoQuery = productoQuery;
            this._productoCommand = productoCommand;
        }

        public async Task<FacturaResponse> ConsultarFactura(int id)
        {
            // Valores 
            var factura = await _query.GetById(id);
           


            //Validacion
            if (factura == null)
            {
                throw new RequieredParameterException("Error!Factura does not exist ");
            }
          
            //Esto es para que traiga la lista de detalles

            var DetallesProductos = factura.Detalles != null ? factura.Detalles.Select(FacturaItem => new FacturaItemResponse
            {Id = FacturaItem.Id,
            Cantidad= FacturaItem.Cantidad,
            FacturaId= factura.Id,
            PrecioUnitario= FacturaItem.PrecioUnitario,
            ProductoId= FacturaItem.ProductoId,
            

            }).ToList() : new List<FacturaItemResponse>();




            return new FacturaResponse
            {
                IdFactura = id,
                FechaEmision = factura.FechaEmision,
                TelefonoEmpresa = factura.TelefonoEmpresa,
                CUIT = factura.CUIT,
                //Importe = factura.Importe,
                Total = factura.Total,
                Detalles=DetallesProductos ,
                DireccionEmpresa = factura.DireccionEmpresa,
                Estado = factura.Estado,
                Cliente = factura.Cliente != null ? new ClienteResponse
                {
                   IdCliente= factura.Cliente.Id,
                   Dni= factura.Cliente.Dni,
                   Email=factura.Cliente.Email,
                   Nombre= factura.Cliente.Nombre
                } : null,
                
               


            };
        }

        public async Task<FacturaResponse> CreateFactura(PagoRequest dto)
        {
            // Validación básica
            if (dto.MPProductos == null || !dto.MPProductos.Any())
                throw new Exception("Debe proporcionar productos para la factura");

            var cliente = await clienteQuery.GetById(dto.ClienteId);
            if (cliente == null)
                throw new Exception("Cliente no encontrado");

            // 1. Crear factura (sin modificar estructura de entidades)
            var factura = new Factura
            {
                FechaEmision = DateTime.Now,
                TelefonoEmpresa = 1131313232,
                CUIT = "2041002466",
                DireccionEmpresa = "Calle Falsa 123",
                IdCliente = cliente.Id,
                Cliente = cliente,
                Estado = true,
                Detalles = new List<FacturaItem>(),
                Total = 0
            };

            // 2. Guardar factura para obtener ID
            factura = await _command.InsertFactura(factura);

            float totalDeFactura = 0;
            var detalles = new List<FacturaItem>();

            // 3. Procesar items usando precios de BD
            foreach (var mpItem in dto.MPProductos)
            {
                var producto = await productoQuery.GetById(mpItem.ProductoId);
                if (producto == null)
                    throw new Exception($"Producto con ID {mpItem.ProductoId} no encontrado");

                // Crear ítem con datos reales de BD
                var facturaItem = new FacturaItem
                {
                    FacturaId = factura.Id,
                    ProductoId = producto.Id,
                    Producto = producto, // Relación opcional
                    Cantidad = mpItem.Cantidad,
                    PrecioUnitario = producto.Precio // Precio REAL desde BD
                };

                detalles.Add(facturaItem);
                totalDeFactura += (float)(facturaItem.Cantidad * facturaItem.PrecioUnitario);
            }

            // 4. Actualizar factura
            factura.Detalles = detalles;
            factura.Total = totalDeFactura;
            await _command.UpdateFactura(factura);

            // 5. Mapear respuesta
            return new FacturaResponse
            {
                FechaEmision = factura.FechaEmision,
                TelefonoEmpresa = factura.TelefonoEmpresa,
                CUIT = factura.CUIT,
                Total = factura.Total,
                DireccionEmpresa = factura.DireccionEmpresa,
                Estado = factura.Estado,
                Detalles = factura.Detalles?.Select(det => new FacturaItemResponse
                {
                    Id = det.Id,
                    Cantidad = det.Cantidad,
                    FacturaId = factura.Id,
                    PrecioUnitario = det.PrecioUnitario,
                    ProductoId = det.ProductoId,
                }).ToList(),
                Cliente = new ClienteResponse
                {
                    IdCliente = cliente.Id,
                    Dni = cliente.Dni,
                    Email = cliente.Email,
                    Nombre = cliente.Nombre
                }
            };
        }

        public async Task<List<FacturaResponse>> GetAll()
        {
            var factura = _query.GetFacturaQuery();

            

            return factura.Select(factura => new FacturaResponse
            {

                IdFactura = factura.Id,
                FechaEmision = factura.FechaEmision,
                TelefonoEmpresa = factura.TelefonoEmpresa,
                CUIT = factura.CUIT,
                //Importe = factura.Importe,
                Total = factura.Total,
                DireccionEmpresa = factura.DireccionEmpresa,
                Estado = factura.Estado,

                Detalles = factura.Detalles != null ? factura.Detalles.Select(FacturaItem => new FacturaItemResponse
                {
                    Id = FacturaItem.Id,
                    Cantidad = FacturaItem.Cantidad,
                    FacturaId = factura.Id,
                    PrecioUnitario = FacturaItem.PrecioUnitario,
                    ProductoId = FacturaItem.ProductoId,


                }).ToList() : new List<FacturaItemResponse>(),

                Cliente = factura.Cliente != null ? new ClienteResponse
                {
                    IdCliente = factura.Cliente.Id,
                    Dni = factura.Cliente.Dni,
                    Email = factura.Cliente.Email,
                    Nombre = factura.Cliente.Nombre
                } : null


            }


            ).ToList();
        }


    }
}
