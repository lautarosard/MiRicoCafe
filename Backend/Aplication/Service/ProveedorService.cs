﻿using Aplication.Exceptions;
using Aplication.Interfaces.IProveedor;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Service
{
    public class ProveedorService : IProveedorService
    {
        private readonly IProveedorQuery _query;
        private readonly IProveedorCommand _command;
        private readonly IMapper _mapper;

        public ProveedorService(IProveedorQuery query, IProveedorCommand command, IMapper mapper)
        {

            _query = query;
            _command = command;
            _mapper = mapper;
        }

        public async Task<ProveedorResponse> CreateProveedor(ProveedorRequest request)
        {
            // recordar hacer una clase para las excepciones 
           
            if (string.IsNullOrEmpty(request.Nombre))
            {

                throw new RequieredParameterException("Error! requiered name");
            }
            if (string.IsNullOrWhiteSpace(request.Email))
            {

                throw new RequieredParameterException("Error! requiered mail");
            }
            if (!request.Email.Contains("@"))
            {

                throw new InvalidateParameterException("Error! email Invalidate");
            }
            if (request.Telefono == 0)
            {

                throw new RequieredParameterException("Error! requiered Phone");
            }

            if (string.IsNullOrEmpty(request.Provincia))
            {

                throw new RequieredParameterException("Error! requiered Provincia");
            }
            if (string.IsNullOrEmpty(request.Localidad))
            {

                throw new RequieredParameterException("Error! requiered Localidad");
            }
            if (string.IsNullOrEmpty(request.Direccion))
            {

                throw new RequieredParameterException("Error! requiered Direccion");
            }
            if (request.Cuit == 0)
            {

                throw new RequieredParameterException("Error! requiered Cuit");
            }


            var proveedor = new Domain.Entities.Proveedor()
            {

                Nombre = request.Nombre,
                Email = request.Email,
                Telefono = request.Telefono,
                Provincia = request.Provincia,
                Localidad = request.Localidad,
                Direccion = request.Direccion,
                CUIT = request.Cuit

            };
            //_mapper.Map<Proveedor>(request);

            await _command.InsertProveedores(proveedor);
            return new ProveedorResponse
            {
                IdProveedor = proveedor.Id,
                Nombre = proveedor.Nombre,
                Email = proveedor.Email,
                Telefono = proveedor.Telefono,
                Provincia = proveedor.Provincia,
                Localidad = proveedor.Localidad,
                Direccion = proveedor.Direccion,
                Cuit = proveedor.CUIT


            };


        }

        public async Task<List<ProveedorResponse>> GetAll()
        {
            var proveedores = _query.GetProveedoresQuery();

            return _mapper.Map<List<ProveedorResponse>>(proveedores);
            /*
            return clients.Select(clients => new ProveedorResponse
            {

                id = clients.ClientsID,
                Name = clients.Name,
                Email = clients.Email,
                Phone = clients.Phone,
                Company = clients.Company,
                Address = clients.Address,

            }
            

            ).ToList();
            */
        }
        // Eliminar 
            public async Task<ProveedorResponse> EliminarProveedor(ProveedorRequest request)
            {
                throw new NotImplementedException();
            }
        // Consultar
            public async Task<ProveedorResponse> ConsultarProveedor(ProveedorRequest request)
            {
                throw new NotImplementedException();
            }
        

            public async Task<ProveedorResponse> UpdateProveedor(int id)
            {
                throw new NotImplementedException();
             }


    }
    
}


