using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Exceptions;
using Aplication.Interfaces.IProducto;
using Aplication.Interfaces.IProveedor;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;
using Domain.Entities;

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

        public async Task<ProductoResponse> ConsultarProducto(int id)
        {
            var producto = await _query.GetById(id);
            if (producto == null)
            {

                throw new RequieredParameterException("Error!producto does not exist ");

            }


            return new ProductoResponse
            {
                IdProducto = producto.Id,
                Nombre = producto.Nombre,
                Categoria = producto.Categoria,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                Stock = producto.Stock,

            };
        }

        public async Task<ProductoResponse> CreateProducto(ProductoRequest request)
        {
            if (string.IsNullOrEmpty(request.Nombre))
            {

                throw new RequieredParameterException("Error! requiered name");
            }
            if (string.IsNullOrWhiteSpace(request.Categoria))
            {

                throw new RequieredParameterException("Error! requiered Categoria");
            }
            var producto = new Domain.Entities.Producto()
            {

                Nombre = request.Nombre,
                Categoria = request.Categoria,
                Descripcion = request.Descripcion,
                Precio = request.Precio,
                Stock = request.Stock,
                ItemsOrdenDeCompra = new List<ItemOrdenDeCompra>()
            };

            await _command.InsertProducto(producto);
            return new ProductoResponse
            {
                IdProducto = producto.Id,
                Nombre = producto.Nombre,
                Categoria = producto.Categoria,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                Stock = producto.Stock,


            };
        }

        public async Task<ProductoResponse> EliminarProducto(int id)
        {
            var producto = await _query.GetById(id);
            if (producto == null)
            {

                throw new RequieredParameterException("Error!producto does not exist ");

            }
            await _command.RemoveProducto(producto);


            return new ProductoResponse
            {
                IdProducto = producto.Id,
                Nombre = producto.Nombre,
                Categoria = producto.Categoria,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                Stock = producto.Stock,


            };
        }

        public async Task<List<ProductoResponse>> GetAll()
        {
            var producto = _query.GetProductoQuery();
            return producto.Select(producto => new ProductoResponse
            {

                IdProducto = producto.Id,
                Nombre = producto.Nombre,
                Categoria = producto.Categoria,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                Stock = producto.Stock,

            }


           ).ToList();
        }

    

        public async Task<ProductoResponse> UpdateProducto(int id, ProductoRequest request)
        {
            if (string.IsNullOrEmpty(request.Nombre))
            {

                throw new RequieredParameterException("Error! requiered name");
            }
            if (string.IsNullOrWhiteSpace(request.Categoria))
            {

                throw new RequieredParameterException("Error! requiered Categoria");
            }

            var producto = await _query.GetById(id);

            producto.Nombre = request.Nombre;
            producto.Categoria = request.Categoria;
            producto.Descripcion = request.Descripcion;
            producto.Precio = request.Precio;
            producto.Stock = request.Stock;
            await _command.UpdateProducto(producto);


            return new ProductoResponse
            {
                IdProducto = producto.Id,
                Nombre = producto.Nombre,
                Categoria = producto.Categoria,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                Stock = producto.Stock,


            };



        }
    }
}
