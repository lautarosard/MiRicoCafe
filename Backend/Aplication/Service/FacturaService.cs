using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

namespace Aplication.Service
{
    public class FacturaService: IFacturaService
    {
        private readonly IFacturaQuery _query;
        private readonly IFacturaCommand _command;
        private readonly IClienteQuery clienteQuery;
        private readonly ICobranzaQuery cobranzaQuery;
        private readonly IProductoQuery productoQuery;

        public FacturaService(IFacturaQuery query, IFacturaCommand command, IClienteQuery clienteQuery, ICobranzaQuery cobranzaQuery, IProductoQuery productoQuery)
        {
            _query = query;
            _command = command;
            this.clienteQuery = clienteQuery;
            this.cobranzaQuery = cobranzaQuery;
            this.productoQuery = productoQuery;
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

            var cliente= await clienteQuery.GetById(dto.ClienteId);
            List<FacturaItem> ItemsDentroDeFacturas = new List<FacturaItem>();
            float TotalDeFactura = 0;

            


            foreach (ProductoMPRequest item in dto.MPProductos) {
                //Creamo un factura item y buscamo el producto que le pusimos
                FacturaItem facturaItemDentroDeLista = new FacturaItem();
                Producto producto= await productoQuery.GetById(item.ProductoId);

                //Mapeamos
                facturaItemDentroDeLista.Id = item.ProductoId;
                facturaItemDentroDeLista.Cantidad = item.Cantidad;
                facturaItemDentroDeLista.ProductoId = item.ProductoId;
                facturaItemDentroDeLista.Producto = producto;
                
                //Hacemos la cuenta para el total de la factura 
                float subtotal = (float)(facturaItemDentroDeLista.Cantidad * facturaItemDentroDeLista.PrecioUnitario);
                TotalDeFactura = TotalDeFactura + subtotal;

                //
                ItemsDentroDeFacturas.Add(facturaItemDentroDeLista);

            }
             //a revisar 
            if (TotalDeFactura >= 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }

            var factura = new Domain.Entities.Factura()
            {
                FechaEmision = DateTime.Now,
                TelefonoEmpresa = 1131313232,
                CUIT = "2041002466",
                DireccionEmpresa = "Calle Falsa 123",
                Detalles= ItemsDentroDeFacturas,                
                Total = TotalDeFactura,
                IdCliente = cliente.Id,
                Cliente = cliente,



            };


            await _command.InsertFactura(factura);
            return new FacturaResponse
            {


                FechaEmision = factura.FechaEmision,
                TelefonoEmpresa = factura.TelefonoEmpresa,
                CUIT = factura.CUIT,
                //Importe = factura.Importe,
                Total = factura.Total,
                DireccionEmpresa = factura.DireccionEmpresa,
                Estado = factura.Estado,
                Detalles= factura.Detalles != null ? factura.Detalles.Select(FacturaItem => new FacturaItemResponse
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
                } : null,




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
