using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Models.Request;
using Aplication.Models.Response;

namespace Aplication.Interfaces.IUsuario
{
    public interface IUsuarioService
    {
        
       //Listar
       Task<List<UsuarioResponse>> GetAll();

       //Crear
       Task<UsuarioResponse> CreateUsuario(UsuarioRequest request);
       // Eliminar 
       Task<UsuarioResponse> EliminarUsuario(int id);
       // Consultar
       Task<UsuarioResponse> ConsultarUsuario(int id);
        

        //Update Usuario (a verificar)
        Task<UsuarioResponse> UpdateUsuario(int id, UsuarioRequest request);
       
    }
}
