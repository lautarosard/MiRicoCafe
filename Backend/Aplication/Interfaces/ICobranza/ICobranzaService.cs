using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Models.Request;
using Aplication.Models.Response;

namespace Aplication.Interfaces.ICobranza
{
    public interface ICobranzaService
    {
        
      //Listar
      Task<List<CobranzaResponse>> GetAll();

      //Crear
      Task<CobranzaResponse> CreateCobranza(CobranzaRequest request);
      // Eliminar 
      Task<CobranzaResponse> EliminarCobranza(int id);
      // Consultar
      Task<CobranzaResponse> ConsultarCobranza(CobranzaRequest request);
      //Update Cobranza (a verificar)
      Task<CobranzaResponse> UpdateCobranza(int id, CobranzaRequest request);

    
    }
}
