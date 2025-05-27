using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Models.Request;
using Aplication.Models.Response;

namespace Aplication.Interfaces.IAdministrador
{
    public interface IAdministradorService
    {
        
       //Listar
       Task<List<AdministradorResponse>> GetAll();

       //Crear
       Task<AdministradorResponse> CreateAdministrador(AdministradorRequest request);
       // Eliminar 
       Task<AdministradorResponse> EliminarAdministrador(int id);
       // Consultar
       Task<AdministradorResponse> ConsultarAdministrador(int id);
        // Consultar por dni
        //Task<AdministradorResponse> ConsultarAdministradorPorDNI(int DNI);

        //Update Administrador (a verificar)
        Task<AdministradorResponse> UpdateAdministrador(int id, AdministradorRequest request);
       
    }
}
