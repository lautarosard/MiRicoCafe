using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.DTO;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;
using Domain.Entities;

namespace Aplication.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            //Cliente
            //CreateMap<Cliente, >();

            //Proveedor
            /*CreateMap<Proveedor, ProveedorResponse>();
            CreateMap<ProveedorResponse,Proveedor>();

            CreateMap<Proveedor,ProveedorRequest>();
            CreateMap<ProveedorRequest, Proveedor>();
            */
            CreateMap<Proveedor, ProveedorResponse>();
            CreateMap<ProveedorRequest, Proveedor>();
        }
    }
}
