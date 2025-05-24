using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Models.Request;
using Aplication.Models.Response;

namespace Aplication.Interfaces.IND
{
    public interface INDService
    {
      
      //Listar
      Task<List<NDResponse>> GetAll();

      //Crear
      Task<NDResponse> CreateNotaDeDebito(NDRequest request);
      
      // Consultar
      Task<NDResponse> ConsultarNotaDeDebito(NDRequest request);
      
      //Update ND (a verificar)
      Task<NDResponse> UpdateNotaDeDebito(int id);

     
    }
}
