using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Models.Request;
using Aplication.Models.Response;

namespace Aplication.Interfaces.IProveedor
{
    public interface IProveedorService
    {
        //Listar
        Task<List<ProveedorResponse>> GetAll();

        //Crear
        Task<ProveedorResponse> CreateProveedor(ProveedorRequest request);
        // Eliminar 
        Task<ProveedorResponse> EliminarProveedor(int id);
        // Consultar
        Task<ProveedorResponse> ConsultarProveedor(int id);
        // Consultar por cuit
        Task<ProveedorResponse> ConsultarProveedorCuit(string dni);

        Task<ProveedorResponse> UpdateProveedor(int id, ProveedorRequest proveedorRequest);

    }
}
