using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Aplication.Exceptions;
using Aplication.Interfaces.ICliente;
using Aplication.Interfaces.ICobranza;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;
using Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Aplication.Service
{
    public class ClienteService: IClienteService
    {
        private readonly IClienteQuery _query;
        private readonly IClienteCommand _command;
        private readonly IMapper _mapper;

        public ClienteService(IClienteQuery query, IClienteCommand command, IMapper mapper)
        {

            _query = query;
            _command = command;
            _mapper = mapper;
        }

        public async Task<ClienteResponse> ConsultarCliente(int id)
        {
            var cliente = await _query.GetById(id);
            if (cliente == null)
            {

                throw new RequieredParameterException("Error!proveedor does not exist ");

            }


            return new ClienteResponse
            {
                IdCliente = cliente.Id,
                Nombre = cliente.Nombre,
                Email = cliente.Email,
                Dni = cliente.Dni,



            };
        }

        public async Task<ClienteResponse> CreateCliente(ClienteRequest request)
        {
            if (string.IsNullOrEmpty(request.Nombre))
            {

                throw new RequieredParameterException("Error! requiered NombreCliente");
            }
           
            if (string.IsNullOrWhiteSpace(request.Email))
            {

                throw new RequieredParameterException("Error! requiered mail");
            }
            if (!request.Email.Contains("@"))
            {

                throw new InvalidateParameterException("Error! email Invalidate");
            }
            if (request.Dni == 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }
            var cliente = new Domain.Entities.Cliente()
            {

                Nombre = request.Nombre,
                Email = request.Email,
                Dni = request.Dni,
            };

            await _command.InsertCliente(cliente);
            return new ClienteResponse
            {
                IdCliente = cliente.Id,
                Nombre = cliente.Nombre,
                Email = cliente.Email,
                Dni = cliente.Dni,


            };
        }

        public async Task<ClienteResponse> EliminarCliente(int id)
        {
            var cliente = await _query.GetById(id);
            if (cliente == null)
            {

                throw new RequieredParameterException("Error!proveedor does not exist ");

            }
            await _command.RemoveCliente(cliente);


            return new ClienteResponse
            {
                IdCliente = cliente.Id,
                Nombre = cliente.Nombre,
                Email = cliente.Email,
                Dni = cliente.Dni,


            };
        }

        public async Task<List<ClienteResponse>> GetAll()
        {
            var clientes = _query.GetClienteQuery();


            return clientes.Select(clientes => new ClienteResponse
            {

                IdCliente = clientes.Id,
                Nombre = clientes.Nombre,
                Email = clientes.Email,
                Dni = clientes.Dni,

            }


            ).ToList();
        }

        public async Task<ClienteResponse> UpdateCliente(int id, ClienteRequest request)
        {
            if (string.IsNullOrEmpty(request.Nombre))
            {

                throw new RequieredParameterException("Error! requiered NombreCliente");
            }

            if (string.IsNullOrWhiteSpace(request.Email))
            {

                throw new RequieredParameterException("Error! requiered mail");
            }
            if (!request.Email.Contains("@"))
            {

                throw new InvalidateParameterException("Error! email Invalidate");
            }
            if (request.Dni == 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }

            var clientes = await _query.GetById(id);


            clientes.Nombre = request.Nombre;
            clientes.Email = request.Email;
            clientes.Dni = request.Dni;

            await _command.UpdateCliente(clientes);


            return new ClienteResponse
            {
                IdCliente = clientes.Id,
                Nombre = clientes.Nombre,
                Email = clientes.Email,
                Dni = clientes.Dni,


            };



        }
    }
}
