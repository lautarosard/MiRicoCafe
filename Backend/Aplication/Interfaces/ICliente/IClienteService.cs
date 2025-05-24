using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Models.Request;
using Aplication.Models.Response;

namespace Aplication.Interfaces.ICliente
{
    public interface IClienteService
    {
        
       //Listar
       Task<List<ClienteResponse>> GetAll();

       //Crear
       Task<ClienteResponse> CreateCliente(ClienteRequest request);
       // Eliminar 
       Task<ClienteResponse> EliminarCliente(ClienteRequest request);
       // Consultar
       Task<ClienteResponse> ConsultarCliente(ClienteRequest request);
       //Update Cliente (a verificar)
       Task<ClienteResponse> UpdateCliente(int id);
       
    }
}
