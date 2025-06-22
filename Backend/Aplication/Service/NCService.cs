using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Exceptions;
using Aplication.Interfaces.INC;
using Aplication.Interfaces.IND;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;
using Domain.Entities;

namespace Aplication.Service
{
    public class NCService: INCService
    {
        private readonly INCQuery _query;
        private readonly INCCommand _command;
        private readonly IMapper _mapper;

        public NCService(INCQuery query, INCCommand command, IMapper mapper)
        {

            _query = query;
            _command = command;
            _mapper = mapper;
        }

        public async Task<NCResponse> ConsultarNotaDeCredito(int id )
        {
            var NotaDeCredito = await _query.GetById(id);
            if (NotaDeCredito == null)
            {

                throw new RequieredParameterException("Error!proveedor does not exist ");

            }


            return new NCResponse
            {
                FechaEmision = NotaDeCredito.FechaEmision,
                DireccionCliente = NotaDeCredito.DireccionCliente,
                TelefonoEmpresa = NotaDeCredito.TelefonoEmpresa,
                CUIT = NotaDeCredito.CUIT,
                CUILCliente = NotaDeCredito.CUILCliente,
                NombreCliente = NotaDeCredito.NombreCliente,
                LocalidadCliente = NotaDeCredito.LocalidadCliente,
                IVA = NotaDeCredito.IVA,
                Importe = NotaDeCredito.Importe,
                Total = NotaDeCredito.Total,
                FechaVencimiento = NotaDeCredito.FechaVencimiento,


            };
        }

        public async Task<NCResponse> CreateNotaDeCredito(NCRequest request)
        {
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

                throw new RequieredParameterException("Error! requiered PhoneEnterprise");
            }

            if (request.CUILCliente == 0)
            {

                throw new RequieredParameterException("Error! requiered CUILCliente");
            }
            if (request.CUIT == "")
            {

                throw new RequieredParameterException("Error! requiered CUIT");
            }

            if (request.FechaVencimiento > request.FechaEmision)
            {

                throw new RequieredParameterException("Error! requiered FechaVencimiento");
            }
            var NotaDeCredito = new Domain.Entities.NotaDeCredito()
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
            await _command.InsertNotaDeCredito(NotaDeCredito);
            return new NCResponse
            {

                FechaEmision = NotaDeCredito.FechaEmision,
                DireccionCliente = NotaDeCredito.DireccionCliente,
                TelefonoEmpresa = NotaDeCredito.TelefonoEmpresa,
                CUIT = NotaDeCredito.CUIT,
                CUILCliente = NotaDeCredito.CUILCliente,
                NombreCliente = NotaDeCredito.NombreCliente,
                LocalidadCliente = NotaDeCredito.LocalidadCliente,
                IVA = NotaDeCredito.IVA,
                Importe = NotaDeCredito.Importe,
                Total = NotaDeCredito.Total,
                FechaVencimiento = NotaDeCredito.FechaVencimiento,
                DireccionEmpresa = NotaDeCredito.DireccionEmpresa,



            };


        }

        public async Task<List<NCResponse>> GetAll()
        {
            var NotaDeCredito = _query.GetNotaDeCreditoQuery();

            //return _mapper.Map<List<ProveedorResponse>>(proveedores);

            return NotaDeCredito.Select(NotaDeCredito => new NCResponse
            {

                FechaEmision = NotaDeCredito.FechaEmision,
                DireccionCliente = NotaDeCredito.DireccionCliente,
                TelefonoEmpresa = NotaDeCredito.TelefonoEmpresa,
                CUIT = NotaDeCredito.CUIT,
                CUILCliente = NotaDeCredito.CUILCliente,
                NombreCliente = NotaDeCredito.NombreCliente,
                LocalidadCliente = NotaDeCredito.LocalidadCliente,
                IVA = NotaDeCredito.IVA,
                Importe = NotaDeCredito.Importe,
                Total = NotaDeCredito.Total,
                FechaVencimiento = NotaDeCredito.FechaVencimiento,
                DireccionEmpresa = NotaDeCredito.DireccionEmpresa,

            }


            ).ToList();
        }


    }
}
