using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.Exceptions;
using Aplication.Interfaces.IOC;
using Aplication.Interfaces.IProducto;
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
        private readonly IMapper _mapper;

        public OCService(IOCQuery query, IOCCommand command, IMapper mapper)
        {

            _query = query;
            _command = command;
            _mapper = mapper;
        }

        public async Task<OCResponse> ConsultarOrdenDeCompra(int id)
        {
            var OrdenDeCompra = await _query.GetById(id);
            if (OrdenDeCompra == null)
            {

                throw new RequieredParameterException("Error!OrdenDeCompra does not exist ");

            }
            var ListProductos = OrdenDeCompra.Productos != null ? OrdenDeCompra.Productos.Select(ListProductos => new Producto
            {
                Categoria= ListProductos.Categoria,
                Descripcion= ListProductos.Descripcion,
                Nombre= ListProductos.Nombre,
                Precio= ListProductos.Precio,
                Stock= ListProductos.Stock,
            }).ToList() : new List<Producto>();

            return new OCResponse
            {
                IdOrdenDeCompra= OrdenDeCompra.Id,
                Cantidad = OrdenDeCompra.Cantidad,
                Detalle = OrdenDeCompra.Detalle,
                Fecha = OrdenDeCompra.Fecha,
                Importe = OrdenDeCompra.Importe,
                PUnitario = OrdenDeCompra.PUnitario,
                Total = OrdenDeCompra.Total,
                Productos = ListProductos,
                
                Proveedor = OrdenDeCompra.Proveedor != null ? new Proveedor
                {
                    Id = OrdenDeCompra.IdProveedor,
                    Nombre = OrdenDeCompra.Proveedor.Nombre,
                    Email = OrdenDeCompra.Proveedor.Email,
                    Telefono = OrdenDeCompra.Proveedor.Telefono,
                    Provincia = OrdenDeCompra.Proveedor.Provincia,
                    Localidad = OrdenDeCompra.Proveedor.Localidad,
                    Direccion = OrdenDeCompra.Proveedor.Direccion,
                    CUIT = OrdenDeCompra.Proveedor.CUIT

                } : null,
                


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



            var OrdenDeCompra = new Domain.Entities.OrdenDeCompra()
            {
                
                Cantidad= request.Cantidad,
                Detalle= request.Detalle,
                Fecha= request.Fecha,
                Importe= request.Importe,
                Productos=new List<Producto>(),
                IdProveedor= request.IdProveedor,
                
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
                //Productos= request.
                PUnitario = request.PUnitario,
                Total = request.Total,


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


            return new OCResponse
            {
                Cantidad = OrdenDeCompra.Cantidad,
                Detalle = OrdenDeCompra.Detalle,
                Fecha = OrdenDeCompra.Fecha,
                Importe = OrdenDeCompra.Importe,
                //Productos= request.
                PUnitario = OrdenDeCompra.PUnitario,
                Total = OrdenDeCompra.Total,

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
                //Productos= request.
                PUnitario = OrdenDeCompra.PUnitario,
                Total = OrdenDeCompra.Total,
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
            var OrdenDeCompra = await _query.GetById(id);

            OrdenDeCompra.Cantidad = request.Cantidad;
            OrdenDeCompra.Detalle = request.Detalle;
            OrdenDeCompra.Fecha = request.Fecha;
            OrdenDeCompra.Importe = request.Importe;
            //Productos= request.
            OrdenDeCompra.PUnitario = request.PUnitario;
            OrdenDeCompra.Total = request.Total;

            await _command.UpdateOrdenDeCompra(OrdenDeCompra);


            return new OCResponse
            {
                Cantidad = OrdenDeCompra.Cantidad,
                Detalle = OrdenDeCompra.Detalle,
                Fecha = OrdenDeCompra.Fecha,
                Importe = OrdenDeCompra.Importe,
                //Productos= request.
                PUnitario = OrdenDeCompra.PUnitario,
                Total = OrdenDeCompra.Total,


            };

        }


        //public async Task<OCResponse> UpdateProductoINOC(int id, ProductoRequest request) {

        //    var OrdenDeCompra = await _query.GetById(id);



        //}






    }
}
