using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public Task<FacturaResponse> ConsultarFactura(FacturaRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<FacturaResponse> CreateFactura(FacturaRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<FacturaResponse> EliminarFactura(FacturaRequest request)
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
    }
}
