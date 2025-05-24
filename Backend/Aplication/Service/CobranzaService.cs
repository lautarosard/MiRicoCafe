using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.ICobranza;
using Aplication.Interfaces.IFactura;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;

namespace Aplication.Service
{
    public class CobranzaService: ICobranzaService
    {
        private readonly ICobranzaQuery _query;
        private readonly ICobranzaCommand _command;
        private readonly IMapper _mapper;

        public CobranzaService(ICobranzaQuery query, ICobranzaCommand command, IMapper mapper)
        {

            _query = query;
            _command = command;
            _mapper = mapper;
        }

        public Task<CobranzaResponse> ConsultarCobranza(CobranzaRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<CobranzaResponse> CreateCobranza(CobranzaRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<CobranzaResponse> EliminarCobranza(CobranzaRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<List<CobranzaResponse>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<CobranzaResponse> UpdateCobranza(int id)
        {
            throw new NotImplementedException();
        }
    }
}
