using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public Task<NDResponse> ConsultarNotaDeDebito(NDRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<NDResponse> CreateNotaDeDebito(NDRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<List<NDResponse>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<NDResponse> UpdateNotaDeDebito(int id, NDRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
