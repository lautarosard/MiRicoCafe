using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.ICliente;
using Aplication.Interfaces.ICobranza;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;

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

        public Task<ClienteResponse> ConsultarCliente(ClienteRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<ClienteResponse> CreateCliente(ClienteRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<ClienteResponse> EliminarCliente(ClienteRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<List<ClienteResponse>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<ClienteResponse> UpdateCliente(int id)
        {
            throw new NotImplementedException();
        }
    }
}
