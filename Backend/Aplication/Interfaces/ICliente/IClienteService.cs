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
       Task<ClienteResponse> EliminarCliente(int id);
       // Consultar
       Task<ClienteResponse> ConsultarCliente(int id);
       Task<ClienteResponse> ConsultarClienteDni(int dni);
     
        Task<ClienteResponse> UpdateCliente(int id, ClienteRequest request);
       
    }
}
