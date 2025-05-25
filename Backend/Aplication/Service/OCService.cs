using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IOC;
using Aplication.Interfaces.IProducto;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;

namespace Aplication.Service
{
    public class OCService: IOCService
    {
        private readonly IOCQuery _query;
        private readonly IOCCommand _command;
        private readonly IMapper _mapper;

        public OCService(IOCQuery query, IOCCommand command, IMapper mapper)
        {

            _query = query;
            _command = command;
            _mapper = mapper;
        }

        public Task<OCResponse> ConsultarOrdenDeCompra(OCRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<OCResponse> CreateOrdenDeCompra(OCRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<OCResponse> EliminarOrdenDeCompra(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<OCResponse>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<OCResponse> UpdateOrdenDeCompra(int id, OCRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
