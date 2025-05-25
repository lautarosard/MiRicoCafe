using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Exceptions;
using Aplication.Interfaces.ICobranza;
using Aplication.Interfaces.IFactura;
using Aplication.Interfaces.INC;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;

namespace Aplication.Service
{
    public class FacturaService: IFacturaService
    {
        private readonly IFacturaQuery _query;
        private readonly IFacturaCommand _command;
        private readonly IMapper _mapper;

        public FacturaService(IFacturaQuery query, IFacturaCommand command, IMapper mapper)
        {

            _query = query;
            _command = command;
            _mapper = mapper;
        }

        public async Task<FacturaResponse> ConsultarFactura(int id)
        {
            throw new NotImplementedException();
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


            };

            throw new NotImplementedException();
        }

        public Task<FacturaResponse> EliminarFactura(FacturaRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<FacturaResponse> EliminarFactura(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<FacturaResponse>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<FacturaResponse> UpdateFactura(int id)
        {
            throw new NotImplementedException();
        }

        public Task<FacturaResponse> UpdateFactura(int id, FacturaRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
