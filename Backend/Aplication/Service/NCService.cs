using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.INC;
using Aplication.Interfaces.IND;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;

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

        public Task<NCResponse> ConsultarNotaDeCredito(NCRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<NCResponse> CreateNotaDeCredito(NCRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<List<NCResponse>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<NCResponse> UpdateNotaDeCredito(int id, NCRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
