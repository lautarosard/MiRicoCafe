using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Interfaces.IProducto;
using Aplication.Interfaces.IProveedor;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;

namespace Aplication.Service
{
    public class ProductoService: IProductoService
    {
        private readonly IProductoQuery _query;
        private readonly IProductoCommand _command;
        private readonly IMapper _mapper;

        public ProductoService(IProductoQuery query, IProductoCommand command, IMapper mapper)
        {

            _query = query;
            _command = command;
            _mapper = mapper;
        }

        public Task<ProductoResponse> ConsultarProducto(ProductoRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<ProductoResponse> CreateProducto(ProductoRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<ProductoResponse> EliminarProducto(ProductoRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<List<ProductoResponse>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<ProductoResponse> UpdateProducto(int id)
        {
            throw new NotImplementedException();
        }
    }
}
