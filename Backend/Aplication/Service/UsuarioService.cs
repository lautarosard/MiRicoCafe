using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Aplication.Exceptions;
using Aplication.Interfaces.IUsuario;
using Aplication.Interfaces.ICobranza;
using Aplication.Interfaces.IUsuario;
using Aplication.Models.Request;
using Aplication.Models.Response;
using AutoMapper;
using Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Aplication.Service
{
    public class UsuarioService: IUsuarioService
    {
        private readonly IUsuarioQuery _query;
        private readonly IUsuarioCommand _command;
        private readonly IMapper _mapper;

        public UsuarioService(IUsuarioQuery query, IUsuarioCommand command, IMapper mapper)
        {

            _query = query;
            _command = command;
            _mapper = mapper;
        }

        public async Task<UsuarioResponse> ConsultarUsuario(int id)
        {
            var Usuario = await _query.GetById(id);
            if (Usuario == null)
            {

                throw new RequieredParameterException("Error!proveedor does not exist ");

            }


            return new UsuarioResponse
            {
                IdUsuario = Usuario.Id,
                Username = Usuario.Username,
                PasswordHash = Usuario.PasswordHash,
                Rol = Usuario.Rol,


            };
        }

        public async Task<UsuarioResponse> CreateUsuario(UsuarioRequest request)
        {
            if (string.IsNullOrEmpty(request.Username))
            {

                throw new RequieredParameterException("Error! requiered NombreUsuario");
            }
           
            if (string.IsNullOrWhiteSpace(request.PasswordHash))
            {

                throw new RequieredParameterException("Error! requiered mail");
            }

            var Usuario = new Domain.Entities.Usuario()
            {

                Username = request.Username,
                PasswordHash = request.PasswordHash

            };

            await _command.InsertUsuario(Usuario);
            return new UsuarioResponse
            {
                IdUsuario = Usuario.Id,
                Username = request.Username,
                PasswordHash = request.PasswordHash,


            };
        }

        public async Task<UsuarioResponse> EliminarUsuario(int id)
        {
            var Usuario = await _query.GetById(id);
            if (Usuario == null)
            {

                throw new RequieredParameterException("Error!proveedor does not exist ");

            }
            await _command.RemoveUsuario(Usuario);


            return new UsuarioResponse
            {
                IdUsuario = Usuario.Id,
                Username=Usuario.Username,
                PasswordHash=Usuario.PasswordHash,


            };
        }

        public async Task<List<UsuarioResponse>> GetAll()
        {
            var Usuarios = _query.GetUsuarioQuery();

            //return _mapper.Map<List<ProveedorResponse>>(proveedores);

            return Usuarios.Select(Usuarios => new UsuarioResponse
            {

                IdUsuario = Usuarios.Id,
                Username = Usuarios.Username,
                PasswordHash = Usuarios.PasswordHash,
                Rol = Usuarios.Rol,


            }


            ).ToList();
        }

        public async Task<UsuarioResponse> UpdateUsuario(int id, UsuarioRequest request)
        {
            if (string.IsNullOrEmpty(request.Username))
            {

                throw new RequieredParameterException("Error! requiered NombreUsuario");
            }

            if (string.IsNullOrWhiteSpace(request.PasswordHash))
            {

                throw new RequieredParameterException("Error! requiered contrasena");
            }
            
            var Usuarios = await _query.GetById(id);


            Usuarios.Username = request.Username;
            Usuarios.PasswordHash = request.PasswordHash;
            
            await _command.UpdateUsuario(Usuarios);


            return new UsuarioResponse
            {
                IdUsuario = Usuarios.Id,
                Username=Usuarios.Username,
                PasswordHash = Usuarios.PasswordHash,


            };



        }
    }
}
