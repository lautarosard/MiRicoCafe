using Aplication.Interfaces.IAuth;
using Aplication.Interfaces.ICliente;
using Aplication.Interfaces.IJwtGenerator;
using Aplication.Interfaces.IUsuario;
using Aplication.Models.Request;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Aplication.Service
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioQuery _usuarioQuery;
        private readonly IUsuarioCommand _usuarioCommand;
        private readonly IClienteCommand _clienteCommand;
        private readonly IJwtGeneratorService _jwtGenerator;

        public AuthService(
            IUsuarioQuery usuarioQuery,
            IUsuarioCommand usuarioCommand,
            IClienteCommand clienteCommand,
            IJwtGeneratorService jwtGenerator)
        {
            _usuarioQuery = usuarioQuery;
            _usuarioCommand = usuarioCommand;
            _clienteCommand = clienteCommand;
            _jwtGenerator = jwtGenerator;
        }

        public async Task RegistrarUsuarioAsync(RegistroClienteRequest request)
        {
            var existente = await _usuarioQuery.GetByUsuario(request.Username);
            if (existente != null)
                throw new Exception("El usuario ya existe");

            var cliente = new Cliente
            {
                Nombre = request.Cliente.Nombre,
                Email = request.Cliente.Email,
                Dni = request.Cliente.Dni
            };

            await _clienteCommand.InsertCliente(cliente);

            var usuario = new Usuario
            {
                Username = request.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                ClienteId = cliente.Id,
                Rol = "Cliente"
            };

            await _usuarioCommand.InsertUsuario(usuario);
        }

        public async Task<LoginResponse> LoginAsync(string username, string password)
        {
            var usuario = await _usuarioQuery.GetByUsuario(username);
            if (usuario == null || !BCrypt.Net.BCrypt.Verify(password, usuario.PasswordHash))
            {
                throw new Exception("Usuario o contraseña inválidos");
            }

            var token = _jwtGenerator.GenerateToken(usuario);

            return new LoginResponse
            {
                Token = token,
                ClienteId = usuario.ClienteId,
                Username = usuario.Username,
                Rol = usuario.Rol
            };
        }

        public Task RegistrarUsuarioAsync(string username, string password, string rol)
        {
            throw new NotImplementedException();
        }
    }
}
