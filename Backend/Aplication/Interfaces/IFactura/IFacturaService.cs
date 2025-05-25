using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Models.Request;
using Aplication.Models.Response;

namespace Aplication.Interfaces.IFactura
{
    public interface IFacturaService
    {
      
      //Listar
      Task<List<FacturaResponse>> GetAll();

      //Crear
      Task<FacturaResponse> CreateFactura(FacturaRequest request);
    //Consultar
      Task<FacturaResponse> ConsultarFactura(int id);
 
     
    }
}
