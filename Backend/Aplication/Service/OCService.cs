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




            var ListProductos = OrdenDeCompra.DetalleOrdenDeCompra != null ? OrdenDeCompra.DetalleOrdenDeCompra.Select(ListProductos => new ItemOCResponse
            {
                Id = ListProductos.Id,
                Cantidad = ListProductos.Cantidad,
                IdOrdenDeCompra = ListProductos.IdOrdenDeCompra,
                PrecioUnitario = ListProductos.PrecioUnitario,
                ProductoId = ListProductos.ProductoId,

            }).ToList() : new List<ItemOCResponse>();

            return new OCResponse
            {
                IdOrdenDeCompra = OrdenDeCompra.Id,
                Fecha = OrdenDeCompra.Fecha,
                Total = OrdenDeCompra.Total,
                Detalles=ListProductos,
                //Cantidad = OrdenDeCompra.Cantidad,
                //Importe = OrdenDeCompra.Importe,
                //PUnitario = OrdenDeCompra.PUnitario,

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
            
            if (request.IdProveedor < 0)
            {

                throw new RequieredParameterException("Error! requiered Id valido");
            }

            List<ItemOrdenDeCompra> ListaDeItems = new List<ItemOrdenDeCompra>();
            int total = 0;
            var itemConcretoProvisorio = new ItemOrdenDeCompra();


            foreach (ItemOCRequest itemOrdenDe in request.Detalles)
            {
                Producto producto = await productoQuery.GetById(itemOrdenDe.ProductoId);

               
                var itemConcreto = new ItemOrdenDeCompra
                {
                    //Id = 0,
                    ProductoId = itemOrdenDe.ProductoId,
                    PrecioUnitario = producto.Precio,
                    Cantidad = itemOrdenDe.Cantidad,
                    //Producto = producto
                };

                int precioIntermedio = (int)itemConcreto.PrecioUnitario * itemConcreto.Cantidad;
                total += precioIntermedio;
                //itemConcreto.Id = 0;
                //itemConcretoProvisorio = itemConcreto;

                ListaDeItems.Add(itemConcreto);
            }




            var proveedor = await proveedorQuery.GetById(request.IdProveedor);

            var OrdenDeCompra = new Domain.Entities.OrdenDeCompra()
            {
             
                Fecha= request.Fecha,
                DetalleOrdenDeCompra=ListaDeItems,
                IdProveedor = request.IdProveedor,
                Proveedor= proveedor,
                Total= total,
                //Cantidad= request.Cantidad,
                //Importe= request.Importe,
                //PUnitario= request.PUnitario,


            };

            await _command.InsertOrdenDeCompra(OrdenDeCompra);
            return new OCResponse
            {
         
                Fecha = request.Fecha,
                Total = total,
                //Cantidad = request.Cantidad,
                //Importe = request.Importe,
                //PUnitario = request.PUnitario,
                Detalles = OrdenDeCompra.DetalleOrdenDeCompra != null ? OrdenDeCompra.DetalleOrdenDeCompra.Select(ListProductos => new ItemOCResponse
                {
                    Id = ListProductos.Id,
                    Cantidad = ListProductos.Cantidad,
                    IdOrdenDeCompra = ListProductos.IdOrdenDeCompra,
                    PrecioUnitario = ListProductos.PrecioUnitario,
                    ProductoId = ListProductos.ProductoId,

                }).ToList() : new List<ItemOCResponse>(),

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
            var Detalles = OrdenDeCompra.DetalleOrdenDeCompra != null ? OrdenDeCompra.DetalleOrdenDeCompra.Select(ListProductos => new ItemOCResponse
            {
                Id = ListProductos.Id,
                Cantidad = ListProductos.Cantidad,
                IdOrdenDeCompra = ListProductos.IdOrdenDeCompra,
                PrecioUnitario = ListProductos.PrecioUnitario,
                ProductoId = ListProductos.ProductoId,

            }).ToList() : new List<ItemOCResponse>();

            await _command.RemoveOrdenDeCompra(OrdenDeCompra);

           

            return new OCResponse
            {

                Fecha = OrdenDeCompra.Fecha,
                Total = OrdenDeCompra.Total,
                IdOrdenDeCompra= OrdenDeCompra.Id,
                Detalles= Detalles,
                //Cantidad = OrdenDeCompra.Cantidad,
                //Importe = OrdenDeCompra.Importe,
                //PUnitario = OrdenDeCompra.PUnitario,

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

        public async Task<List<OCResponse>> GetAll()
        {
            var OrdenDeCompra = _query.GetOrdenDeCompraQuery();

            return OrdenDeCompra.Select(OrdenDeCompra => new OCResponse
            {

                Fecha = OrdenDeCompra.Fecha,
                Total = OrdenDeCompra.Total,
                IdOrdenDeCompra = OrdenDeCompra.Id,
                //Cantidad = OrdenDeCompra.Cantidad,
                //Importe = OrdenDeCompra.Importe,
                //PUnitario = OrdenDeCompra.PUnitario,
                

                Detalles = OrdenDeCompra.DetalleOrdenDeCompra != null ? OrdenDeCompra.DetalleOrdenDeCompra.Select(ListProductos => new ItemOCResponse
                {
                    Id = ListProductos.Id,
                    Cantidad = ListProductos.Cantidad,
                    IdOrdenDeCompra = ListProductos.IdOrdenDeCompra,
                    PrecioUnitario = ListProductos.PrecioUnitario,
                    ProductoId = ListProductos.ProductoId,

                }).ToList() : new List<ItemOCResponse>(),


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
            }


            ).ToList();
        }

        public async Task<OCResponse> UpdateOrdenDeCompra(int id, OCRequest request)
        {
            //if (string.IsNullOrEmpty(request.Detalle))
            //{

            //    throw new RequieredParameterException("Error! requiered name");
            //}
            //if (request.Cantidad == 0)
            //{

            //    throw new RequieredParameterException("Error! requiered Phone");
            //}
            if (request.IdProveedor < 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }
            var proveedor = await proveedorQuery.GetById(request.IdProveedor);
            if (proveedor == null)
            {

                throw new RequieredParameterException("Error!OrdenDeCompra does not exist ");

            }
            //BLoque de Foreach
            List<ItemOrdenDeCompra> ListaDeItems = new List<ItemOrdenDeCompra>();
            int total = 0;
            foreach (ItemOCRequest itemOrdenDe in request.Detalles)
            {
                var itemConcreto = new ItemOrdenDeCompra();
                Producto producto = await productoQuery.GetById(itemOrdenDe.ProductoId);

                itemConcreto.ProductoId = itemOrdenDe.ProductoId;
                itemConcreto.PrecioUnitario = producto.Precio;
                itemConcreto.Producto = producto;
                itemConcreto.Cantidad = itemOrdenDe.Cantidad;

                int precioIntermedio = (int)itemConcreto.PrecioUnitario * itemConcreto.Cantidad;
                total += precioIntermedio;

                ListaDeItems.Add(itemConcreto);


            }
            // termina bloque
            

            var OrdenDeCompra = await _query.GetById(id);


            OrdenDeCompra.Fecha = request.Fecha;
            OrdenDeCompra.DetalleOrdenDeCompra = ListaDeItems;
            OrdenDeCompra.Total = total;
            OrdenDeCompra.IdProveedor = request.IdProveedor;
            OrdenDeCompra.Proveedor=proveedor;
            //OrdenDeCompra.Cantidad = request.Cantidad;
            //OrdenDeCompra.Importe = request.Importe;
            //OrdenDeCompra.PUnitario = request.PUnitario;
            

            await _command.UpdateOrdenDeCompra(OrdenDeCompra);
            //Bloque de la lista de oc
            var Detalles = OrdenDeCompra.DetalleOrdenDeCompra != null ? OrdenDeCompra.DetalleOrdenDeCompra.Select(ListProductos => new ItemOCResponse
            {
                Id = ListProductos.Id,
                Cantidad = ListProductos.Cantidad,
                IdOrdenDeCompra = ListProductos.IdOrdenDeCompra,
                PrecioUnitario = ListProductos.PrecioUnitario,
                ProductoId = ListProductos.ProductoId,

            }).ToList() : new List<ItemOCResponse>();
            //termina bloque 

            return new OCResponse
            {
                
                Fecha = OrdenDeCompra.Fecha,
                Total = OrdenDeCompra.Total,
                Detalles= Detalles,
                //Cantidad = OrdenDeCompra.Cantidad,
                //Importe = OrdenDeCompra.Importe,
                //PUnitario = OrdenDeCompra.PUnitario,
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


        public async Task<OCResponse> RemoveProductoINOC(int id, int IdProducto)
        {
            //Valida
            if (IdProducto < 0)
            {

                throw new RequieredParameterException("Error! requiered Id existente");
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
            foreach (var producto1 in OrdenDeCompra.DetalleOrdenDeCompra)
            {
                var itemOc = producto1;

                if (producto1.Producto.Id == IdProducto)
                {
                    OrdenDeCompra.Total -= (float)producto1.PrecioUnitario * producto1.Cantidad;

                    OrdenDeCompra.DetalleOrdenDeCompra.Remove(producto1);

                }
                else {
                        throw new NotImplementedException("No se econtro item");

                }
            
            }
            
            await _command.UpdateOrdenDeCompra(OrdenDeCompra);


            var Detalles = OrdenDeCompra.DetalleOrdenDeCompra != null ? OrdenDeCompra.DetalleOrdenDeCompra.Select(ListProductos => new ItemOCResponse
            {
                Id = ListProductos.Id,
                Cantidad = ListProductos.Cantidad,
                IdOrdenDeCompra = ListProductos.IdOrdenDeCompra,
                PrecioUnitario = ListProductos.PrecioUnitario,
                ProductoId = ListProductos.ProductoId,

            }).ToList() : new List<ItemOCResponse>();

            return new OCResponse
            {
                Cantidad = IdProducto,
                Detalles = Detalles,
                Fecha = OrdenDeCompra.Fecha,
                IdOrdenDeCompra = OrdenDeCompra.Id,
                Total = OrdenDeCompra.Total,
                //Importe = OrdenDeCompra.Importe,
                //PUnitario = OrdenDeCompra.PUnitario,
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
