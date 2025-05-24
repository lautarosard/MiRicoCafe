using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Models.Request;
using Aplication.Models.Response;

namespace Aplication.Interfaces.INC
{
    public interface INCService
    {
      
      //Listar
      Task<List<NCResponse>> GetAll();

      //Crear
      Task<NCResponse> CreateNotaDeCredito(NCRequest request);
      
      // Consultar
      Task<NCResponse> ConsultarNotaDeCredito(NCRequest request);
      
      //Update NC (a verificar)
      Task<NCResponse> UpdateNotaDeCredito(int id);
      
    }
}
