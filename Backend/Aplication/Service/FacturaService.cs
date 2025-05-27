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
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;
using Domain.Entities;

namespace Aplication.Service
{
    public class FacturaService: IFacturaService
    {
        private readonly IFacturaQuery _query;
        private readonly IFacturaCommand _command;
        private readonly IClienteQuery clienteQuery;
        private readonly ICobranzaQuery cobranzaQuery;

        public FacturaService(IFacturaQuery query, IFacturaCommand command, IClienteQuery clienteQuery, ICobranzaQuery cobranzaQuery)
        {
            _query = query;
            _command = command;
            this.clienteQuery = clienteQuery;
            this.cobranzaQuery = cobranzaQuery;
        }

        public async Task<FacturaResponse> ConsultarFactura(int id)
        {
            // Valores 
            var factura = await _query.GetById(id);
          

            //Validacion
            if (factura == null)
            {

                throw new RequieredParameterException("Error!proveedor does not exist ");

            }
     



            return new FacturaResponse
            {
                IdFactura = id,
                FechaEmision = factura.FechaEmision,
                DireccionCliente = factura.DireccionCliente,
                TelefonoEmpresa = factura.TelefonoEmpresa,
                CUIT = factura.CUIT,
                CUILCliente = factura.CUILCliente,
                NombreCliente = factura.NombreCliente,
                LocalidadCliente = factura.LocalidadCliente,
                IVA = factura.IVA,
                Importe = factura.Importe,
                Total = factura.Total,
                DireccionEmpresa = factura.DireccionEmpresa,
                FechaVencimiento = factura.FechaVencimiento,
                
             


            };
        }

        public async Task<FacturaResponse> CreateFactura(FacturaRequest request)
        {

            //Esta a medio hacer
            if (string.IsNullOrEmpty(request.NombreCliente))
            {

                throw new RequieredParameterException("Error! requiered NombreCliente");
            }
            if (string.IsNullOrEmpty(request.LocalidadCliente))
            {

                throw new RequieredParameterException("Error! requiered mail");
            }
            if (string.IsNullOrEmpty(request.DireccionCliente))
            {

                throw new InvalidateParameterException("Error! email Invalidate");
            }
            if (request.TelefonoEmpresa == 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }

            if (request.CUILCliente == 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }
            if (request.CUIT == 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }

            if (request.FechaVencimiento > request.FechaEmision)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }
            var factura = new Domain.Entities.Factura()
            {
                FechaEmision = request.FechaEmision,
                DireccionCliente = request.DireccionCliente,
                TelefonoEmpresa = request.TelefonoEmpresa,
                CUIT = request.CUIT,
                CUILCliente = request.CUILCliente,
                NombreCliente = request.NombreCliente,
                LocalidadCliente = request.LocalidadCliente,
                IVA = request.IVA,
                Importe = request.Importe,
                Total = request.Total,
                FechaVencimiento = request.FechaVencimiento,
                
               
            };

            await _command.InsertFactura(factura);
            return new FacturaResponse
            {
                
                FechaEmision = factura.FechaEmision,
                DireccionCliente = factura.DireccionCliente,
                TelefonoEmpresa = factura.TelefonoEmpresa,
                CUIT = factura.CUIT,
                CUILCliente = factura.CUILCliente,
                NombreCliente = factura.NombreCliente,
                LocalidadCliente = factura.LocalidadCliente,
                IVA = factura.IVA,
                Importe = factura.Importe,
                Total = factura.Total,
                FechaVencimiento = factura.FechaVencimiento,
                DireccionEmpresa = factura.DireccionEmpresa,
                


            };

          
        }


       
        public async Task<List<FacturaResponse>> GetAll()
        {
            var factura =_query.GetFacturaQuery();

            return factura.Select(factura => new FacturaResponse
            {

                FechaEmision = factura.FechaEmision,
                DireccionCliente = factura.DireccionCliente,
                TelefonoEmpresa = factura.TelefonoEmpresa,
                CUIT = factura.CUIT,
                CUILCliente = factura.CUILCliente,
                NombreCliente = factura.NombreCliente,
                LocalidadCliente = factura.LocalidadCliente,
                IVA = factura.IVA,
                Importe = factura.Importe,
                Total = factura.Total,
                FechaVencimiento = factura.FechaVencimiento,
                DireccionEmpresa = factura.DireccionEmpresa,

            }


            ).ToList();
        }

       
    }
}
