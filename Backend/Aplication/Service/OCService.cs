using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Exceptions;
using Aplication.Interfaces.IOC;
using Aplication.Interfaces.IProducto;
using Aplication.Interfaces.IProveedor;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;
using Domain.Entities;
using Microsoft.VisualBasic;

namespace Aplication.Service
{
    public class OCService: IOCService
    {
        private readonly IOCQuery _query;
        private readonly IOCCommand _command;
        private readonly IProveedorQuery proveedorQuery;
        private readonly IProductoQuery productoQuery;

        public OCService(IOCQuery query, IOCCommand command, IProveedorQuery proveedorQuery, IProductoQuery productoQuery)
        {
            _query = query;
            _command = command;
            this.proveedorQuery = proveedorQuery;
            this.productoQuery = productoQuery;
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        public async Task<OCResponse> ConsultarOrdenDeCompra(int id)
        {
            var OrdenDeCompra = await _query.GetById(id);
            var proveedor= await proveedorQuery.GetById(id);
            if (OrdenDeCompra == null)
            {

                throw new RequieredParameterException("Error!OrdenDeCompra does not exist ");

            }
            if (proveedor == null)
            {

                throw new RequieredParameterException("Error!OrdenDeCompra does not exist ");

            }
            var ListProductos = OrdenDeCompra.Productos != null ? OrdenDeCompra.Productos.Select(ListProductos => new ProductoResponse
            {
                
                Categoria= ListProductos.Categoria,
                Descripcion= ListProductos.Descripcion,
                Nombre= ListProductos.Nombre,
                Precio= ListProductos.Precio,
                Stock= ListProductos.Stock,

            }).ToList() : new List<ProductoResponse>();

            return new OCResponse
            {
                IdOrdenDeCompra = OrdenDeCompra.Id,
                Cantidad = OrdenDeCompra.Cantidad,
                Detalle = OrdenDeCompra.Detalle,
                Fecha = OrdenDeCompra.Fecha,
                Importe = OrdenDeCompra.Importe,
                PUnitario = OrdenDeCompra.PUnitario,
                Total = OrdenDeCompra.Total,
                Productos = ListProductos,

                Proveedor = OrdenDeCompra.Proveedor != null ? new ProveedorResponse 
                {
                    IdProveedor = proveedor.Id,
                    Cuit = proveedor.CUIT,
                    Direccion = proveedor.Direccion,
                    Email = proveedor.Email,
                    Localidad = proveedor.Localidad,
                    Nombre = proveedor.Nombre,
                    Provincia = proveedor.Provincia,
                    Telefono = proveedor.Telefono,
                } : null

            };
        }


        public async Task<OCResponse> CreateOrdenDeCompra(OCRequest request)
        {
            if (string.IsNullOrEmpty(request.Detalle))
            {

                throw new RequieredParameterException("Error! requiered name");
            }
            if (request.Cantidad == 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }
            if (request.IdProveedor > 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }

            var proveedor = await proveedorQuery.GetById(request.IdProveedor);


            var OrdenDeCompra = new Domain.Entities.OrdenDeCompra()
            {
                
                Cantidad= request.Cantidad,
                Detalle= request.Detalle,
                Fecha= request.Fecha,
                Importe= request.Importe,
                Productos=new List<Producto>(),
                IdProveedor= request.IdProveedor,
                Proveedor= proveedor,
                PUnitario= request.PUnitario,
                Total= request.Total,
               

            };

            await _command.InsertOrdenDeCompra(OrdenDeCompra);
            return new OCResponse
            {
                Cantidad = request.Cantidad,
                Detalle = request.Detalle,
                Fecha = request.Fecha,
                Importe = request.Importe,
                PUnitario = request.PUnitario,
                Total = request.Total,
                Proveedor = OrdenDeCompra.Proveedor != null ? new ProveedorResponse
                {
                    IdProveedor = proveedor.Id,
                    Cuit = proveedor.CUIT,
                    Direccion = proveedor.Direccion,
                    Email = proveedor.Email,
                    Localidad = proveedor.Localidad,
                    Nombre = proveedor.Nombre,
                    Provincia = proveedor.Provincia,
                    Telefono = proveedor.Telefono,
                } : null,
               


            };
        }

        public async Task<OCResponse> EliminarOrdenDeCompra(int id)
        {
            var OrdenDeCompra = await _query.GetById(id);
            if (OrdenDeCompra == null)
            {

                throw new RequieredParameterException("Error!OrdenDeCompra does not exist ");

            }
            await _command.RemoveOrdenDeCompra(OrdenDeCompra);

            var ListProductos = OrdenDeCompra.Productos != null ? OrdenDeCompra.Productos.Select(ListProductos => new ProductoResponse
            {

                Categoria = ListProductos.Categoria,
                Descripcion = ListProductos.Descripcion,
                Nombre = ListProductos.Nombre,
                Precio = ListProductos.Precio,
                Stock = ListProductos.Stock,
            }).ToList() : new List<ProductoResponse>();



            return new OCResponse
            {
                Cantidad = OrdenDeCompra.Cantidad,
                Detalle = OrdenDeCompra.Detalle,
                Fecha = OrdenDeCompra.Fecha,
                Importe = OrdenDeCompra.Importe,
                Productos= ListProductos,
                PUnitario = OrdenDeCompra.PUnitario,
                Total = OrdenDeCompra.Total,
                IdOrdenDeCompra= OrdenDeCompra.Id,
                Proveedor= OrdenDeCompra.Proveedor != null ? new ProveedorResponse
                {
                    IdProveedor = OrdenDeCompra.Proveedor.Id,
                    Cuit = OrdenDeCompra.Proveedor.CUIT,
                    Direccion = OrdenDeCompra.Proveedor.Direccion,
                    Email = OrdenDeCompra.Proveedor.Email,
                    Localidad = OrdenDeCompra.Proveedor.Localidad,
                    Nombre = OrdenDeCompra.Proveedor.Nombre,
                    Provincia = OrdenDeCompra.Proveedor.Provincia,
                    Telefono = OrdenDeCompra.Proveedor.Telefono,
                } : null

            };
        }

        public async Task<List<OCResponse>> GetAll()
        {
            var OrdenDeCompra = _query.GetOrdenDeCompraQuery();

           

            return OrdenDeCompra.Select(OrdenDeCompra => new OCResponse
            {

                
                Cantidad = OrdenDeCompra.Cantidad,
                Detalle = OrdenDeCompra.Detalle,
                Fecha = OrdenDeCompra.Fecha,
                Importe = OrdenDeCompra.Importe,
                PUnitario = OrdenDeCompra.PUnitario,
                Total = OrdenDeCompra.Total,
                IdOrdenDeCompra = OrdenDeCompra.Id,

                Productos = OrdenDeCompra.Productos != null ? OrdenDeCompra.Productos.Select(ListProductos => new ProductoResponse
                    {
                    Categoria = ListProductos.Categoria,
                    Descripcion = ListProductos.Descripcion,
                    Nombre = ListProductos.Nombre,
                    Precio = ListProductos.Precio,
                    Stock = ListProductos.Stock,
                    }).ToList() : new List<ProductoResponse>(),

                Proveedor= OrdenDeCompra.Proveedor != null ? new ProveedorResponse
                {
                    IdProveedor = OrdenDeCompra.Proveedor.Id,
                    Cuit = OrdenDeCompra.Proveedor.CUIT,
                    Direccion = OrdenDeCompra.Proveedor.Direccion,
                    Email = OrdenDeCompra.Proveedor.Email,
                    Localidad = OrdenDeCompra.Proveedor.Localidad,
                    Nombre = OrdenDeCompra.Proveedor.Nombre,
                    Provincia = OrdenDeCompra.Proveedor.Provincia,
                    Telefono = OrdenDeCompra.Proveedor.Telefono,
                } : null
            }


            ).ToList();
        }

        public async Task<OCResponse> UpdateOrdenDeCompra(int id, OCRequest request)
        {
            if (string.IsNullOrEmpty(request.Detalle))
            {

                throw new RequieredParameterException("Error! requiered name");
            }
            if (request.Cantidad == 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }
            if (request.IdProveedor > 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }
            var proveedor = await proveedorQuery.GetById(request.IdProveedor);
            if (proveedor == null)
            {

                throw new RequieredParameterException("Error!OrdenDeCompra does not exist ");

            }


            var OrdenDeCompra = await _query.GetById(id);


            OrdenDeCompra.Cantidad = request.Cantidad;
            OrdenDeCompra.Detalle = request.Detalle;
            OrdenDeCompra.Fecha = request.Fecha;
            OrdenDeCompra.Importe = request.Importe;
            OrdenDeCompra.PUnitario = request.PUnitario;
            OrdenDeCompra.Total = request.Total;
            OrdenDeCompra.IdProveedor = request.IdProveedor;
            OrdenDeCompra.Proveedor=proveedor;
            

            await _command.UpdateOrdenDeCompra(OrdenDeCompra);

            var ListProductos = OrdenDeCompra.Productos != null ? OrdenDeCompra.Productos.Select(ListProductos => new ProductoResponse
            {

                Categoria = ListProductos.Categoria,
                Descripcion = ListProductos.Descripcion,
                Nombre = ListProductos.Nombre,
                Precio = ListProductos.Precio,
                Stock = ListProductos.Stock,
            }).ToList() : new List<ProductoResponse>();



            return new OCResponse
            {
                Cantidad = OrdenDeCompra.Cantidad,
                Detalle = OrdenDeCompra.Detalle,
                Fecha = OrdenDeCompra.Fecha,
                Importe = OrdenDeCompra.Importe,
                PUnitario = OrdenDeCompra.PUnitario,
                Total = OrdenDeCompra.Total,
                Productos= ListProductos,
                Proveedor = OrdenDeCompra.Proveedor != null ? new ProveedorResponse
                {
                    IdProveedor = OrdenDeCompra.Proveedor.Id,
                    Cuit = OrdenDeCompra.Proveedor.CUIT,
                    Direccion = OrdenDeCompra.Proveedor.Direccion,
                    Email = OrdenDeCompra.Proveedor.Email,
                    Localidad = OrdenDeCompra.Proveedor.Localidad,
                    Nombre = OrdenDeCompra.Proveedor.Nombre,
                    Provincia = OrdenDeCompra.Proveedor.Provincia,
                    Telefono = OrdenDeCompra.Proveedor.Telefono,
                } : null


            };

        }


        public async Task<OCResponse> UpdateProductoINOC(int id, int IdProducto, int Cantidad)
        {
            //Valida
            if (IdProducto > 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }
            if (Cantidad >= 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }


            //Busca Por ID

            var OrdenDeCompra = await _query.GetById(id);
            var producto = await productoQuery.GetById(IdProducto);


            //Valida
            if (producto == null)
            {
                throw new NotImplementedException("Project not found");
            }

            if (OrdenDeCompra == null)
            {
                throw new NotImplementedException("Project not found");
            }


            //Modifica
            producto.Stock = Cantidad;

            OrdenDeCompra.Productos.Add(producto);

            OrdenDeCompra.Total += (float)producto.Precio * Cantidad;

            await _command.UpdateOrdenDeCompra(OrdenDeCompra);


            //Lista de productos response 

            var ListProductos = OrdenDeCompra.Productos != null ? OrdenDeCompra.Productos.Select(ListProductos => new ProductoResponse
            {

                Categoria = ListProductos.Categoria,
                Descripcion = ListProductos.Descripcion,
                Nombre = ListProductos.Nombre,
                Precio = ListProductos.Precio,
                Stock = ListProductos.Stock,
            }).ToList() : new List<ProductoResponse>();


          

            return new OCResponse
            {
                Cantidad = IdProducto,
                Detalle = OrdenDeCompra.Detalle,
                Fecha = OrdenDeCompra.Fecha,
                IdOrdenDeCompra = OrdenDeCompra.Id,
                Importe = OrdenDeCompra.Importe,
                Productos = ListProductos,
                Total = OrdenDeCompra.Total,
                PUnitario = OrdenDeCompra.PUnitario,
                Proveedor = OrdenDeCompra.Proveedor != null ? new ProveedorResponse
                {
                    IdProveedor = OrdenDeCompra.Proveedor.Id,
                    Cuit = OrdenDeCompra.Proveedor.CUIT,
                    Direccion = OrdenDeCompra.Proveedor.Direccion,
                    Email = OrdenDeCompra.Proveedor.Email,
                    Localidad = OrdenDeCompra.Proveedor.Localidad,
                    Nombre = OrdenDeCompra.Proveedor.Nombre,
                    Provincia = OrdenDeCompra.Proveedor.Provincia,
                    Telefono = OrdenDeCompra.Proveedor.Telefono,
                } : null,
                
            };

        }


        public async Task<OCResponse> RemoveProductoINOC(int id, int IdProducto)
        {
            //Valida
            if (IdProducto > 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }
          


            //Busca Por ID

            var OrdenDeCompra = await _query.GetById(id);
            var producto = await productoQuery.GetById(IdProducto);


            //Valida
            if (producto == null)
            {
                throw new NotImplementedException("Project not found");
            }

            if (OrdenDeCompra == null)
            {
                throw new NotImplementedException("Project not found");
            }


            //Buscar Dentro de la lista
            foreach (var producto1 in OrdenDeCompra.Productos)
            {

                if (producto1.Id == IdProducto)
                {
                    OrdenDeCompra.Total -= (float)producto1.Precio * producto1.Stock;

                    OrdenDeCompra.Productos.Remove(producto1);

                }
                else {
                        throw new NotImplementedException("Project not found");

                }
            
            }
            
            await _command.UpdateOrdenDeCompra(OrdenDeCompra);


            //Lista de productos response 

            var ListProductos = OrdenDeCompra.Productos != null ? OrdenDeCompra.Productos.Select(ListProductos => new ProductoResponse
            {

                Categoria = ListProductos.Categoria,
                Descripcion = ListProductos.Descripcion,
                Nombre = ListProductos.Nombre,
                Precio = ListProductos.Precio,
                Stock = ListProductos.Stock,
            }).ToList() : new List<ProductoResponse>();




            return new OCResponse
            {
                Cantidad = IdProducto,
                Detalle = OrdenDeCompra.Detalle,
                Fecha = OrdenDeCompra.Fecha,
                IdOrdenDeCompra = OrdenDeCompra.Id,
                Importe = OrdenDeCompra.Importe,
                Productos = ListProductos,
                Total = OrdenDeCompra.Total,
                PUnitario = OrdenDeCompra.PUnitario,
                Proveedor = OrdenDeCompra.Proveedor != null ? new ProveedorResponse
                {
                    IdProveedor = OrdenDeCompra.Proveedor.Id,
                    Cuit = OrdenDeCompra.Proveedor.CUIT,
                    Direccion = OrdenDeCompra.Proveedor.Direccion,
                    Email = OrdenDeCompra.Proveedor.Email,
                    Localidad = OrdenDeCompra.Proveedor.Localidad,
                    Nombre = OrdenDeCompra.Proveedor.Nombre,
                    Provincia = OrdenDeCompra.Proveedor.Provincia,
                    Telefono = OrdenDeCompra.Proveedor.Telefono,
                } : null,

            };

        }













    }
}
