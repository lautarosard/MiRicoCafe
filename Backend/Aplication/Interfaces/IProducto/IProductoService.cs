using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Models.Request;
using Aplication.Models.Response;

namespace Aplication.Interfaces.IProducto
{
    public interface IProductoService
    {
        
        //Listar
        Task<List<ProductoResponse>> GetAll();

        //Crear
        Task<ProductoResponse> CreateProducto(ProductoRequest request);
        // Eliminar 
        Task<ProductoResponse> EliminarProducto(ProductoRequest request);
        // Consultar
        Task<ProductoResponse> ConsultarProducto(ProductoRequest request);
        //Update proveedor (a verificar)
        Task<ProductoResponse> UpdateProducto(int id);

    }
}
