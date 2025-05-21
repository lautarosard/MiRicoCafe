using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aplication.DTO;
using AutoMapper;
using Domain.Entities;

namespace Aplication.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            //Cliente
            CreateMap<Cliente, ClienteDTO>();

            //Proveedor
            CreateMap<Proveedor, ProveedorDTO>();
        }
    }
}
