using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Models.Request;
using Aplication.Models.Response;

namespace Aplication.Interfaces.IOC
{
    public interface IOCService
    {
        //Listar
        Task<List<OCResponse>> GetAll();

        //Crear
        Task<OCResponse> CreateOrdenDeCompra(OCRequest request);
        // Eliminar 
        Task<OCResponse> EliminarOrdenDeCompra(int id);
        // Consultar
        Task<OCResponse> ConsultarOrdenDeCompra(int id);
        //Update OC (a verificar)
        Task<OCResponse> UpdateOrdenDeCompra(int id, OCRequest request);
     
    }
}
