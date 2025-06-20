using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Exceptions;
using Aplication.Interfaces.IND;
using Aplication.Interfaces.IOC;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;

namespace Aplication.Service
{
    public class NDService: INDService
    {
        private readonly INDQuery _query;
        private readonly INDCommand _command;
        private readonly IMapper _mapper;

        public NDService(INDQuery query, INDCommand command, IMapper mapper)
        {

            _query = query;
            _command = command;
            _mapper = mapper;
        }

        public async Task<NDResponse> ConsultarNotaDeDebito(int id)
        {
            var NotaDeDebito = await _query.GetById(id);
            if (NotaDeDebito == null)
            {

                throw new RequieredParameterException("Error!proveedor does not exist ");

            }


            return new NDResponse
            {
                FechaEmision = NotaDeDebito.FechaEmision,
                DireccionCliente = NotaDeDebito.DireccionCliente,
                TelefonoEmpresa = NotaDeDebito.TelefonoEmpresa,
                CUIT = NotaDeDebito.CUIT,
                CUILCliente = NotaDeDebito.CUILCliente,
                NombreCliente = NotaDeDebito.NombreCliente,
                LocalidadCliente = NotaDeDebito.LocalidadCliente,
                IVA = NotaDeDebito.IVA,
                Importe = NotaDeDebito.Importe,
                Total = NotaDeDebito.Total,
                FechaVencimiento = NotaDeDebito.FechaVencimiento,


            };
        }

        public async Task<NDResponse> CreateNotaDeDebito(NDRequest request)
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

                throw new RequieredParameterException("Error! requiered Phone");
            }

            if (request.CUILCliente == 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }
            if (request.CUIT == "")
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }

            if (request.FechaVencimiento > request.FechaEmision)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }
            var NotaDeDebito = new Domain.Entities.NotaDeDebito()
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
            await _command.InsertNotaDeDebito(NotaDeDebito);
            return new NDResponse
            {

                FechaEmision = NotaDeDebito.FechaEmision,
                DireccionCliente = NotaDeDebito.DireccionCliente,
                TelefonoEmpresa = NotaDeDebito.TelefonoEmpresa,
                CUIT = NotaDeDebito.CUIT,
                CUILCliente = NotaDeDebito.CUILCliente,
                NombreCliente = NotaDeDebito.NombreCliente,
                LocalidadCliente = NotaDeDebito.LocalidadCliente,
                IVA = NotaDeDebito.IVA,
                Importe = NotaDeDebito.Importe,
                Total = NotaDeDebito.Total,
                FechaVencimiento = NotaDeDebito.FechaVencimiento,
                DireccionEmpresa = NotaDeDebito.DireccionEmpresa,



            };

        }

        public async Task<List<NDResponse>> GetAll()
        {
            var NotaDeDebito = _query.GetNotaDeDebitoQuery();

            //return _mapper.Map<List<ProveedorResponse>>(proveedores);

            return NotaDeDebito.Select(NotaDeDebito => new NDResponse
            {

                FechaEmision = NotaDeDebito.FechaEmision,
                DireccionCliente = NotaDeDebito.DireccionCliente,
                TelefonoEmpresa = NotaDeDebito.TelefonoEmpresa,
                CUIT = NotaDeDebito.CUIT,
                CUILCliente = NotaDeDebito.CUILCliente,
                NombreCliente = NotaDeDebito.NombreCliente,
                LocalidadCliente = NotaDeDebito.LocalidadCliente,
                IVA = NotaDeDebito.IVA,
                Importe = NotaDeDebito.Importe,
                Total = NotaDeDebito.Total,
                FechaVencimiento = NotaDeDebito.FechaVencimiento,
                DireccionEmpresa = NotaDeDebito.DireccionEmpresa,

            }


            ).ToList();
        }

     
    }
}
