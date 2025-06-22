using Aplication.Interfaces.IAuth;
using Aplication.Interfaces.ICliente;
using Aplication.Interfaces.IUsuario;
using Aplication.Models.Request;
using Aplication.Service;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace CafeElMejor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService  _service;
        private readonly IUsuarioService _usuarioService;

        public AuthController(IAuthService service, IUsuarioService usuarioService)
        {
            _service = service;
            _usuarioService = usuarioService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Aplication.Models.Request.LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Usuario) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Username y contraseña son requeridos.");
            }

            try
            {
                var response = await _service.LoginAsync(request.Usuario, request.Password);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
        }

        [HttpPost("register-cliente")]
        public async Task<IActionResult> Register([FromBody] RegistroClienteRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Username y contraseña son requeridos.");
            }

            if (request.Cliente == null)
            {
                return BadRequest("Datos del cliente requeridos.");
            }

            try
            {
                await _service.RegistrarUsuarioAsync(request);
                return Ok(new { Message = "Cliente registrado correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        
        //borrar
        [HttpPost("register-admin")]
        public async Task<IActionResult> RegisterAdmin()
        {
            
            var admin = new UsuarioRequest
            {
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("contraseña")
            };

            await _usuarioService.CreateUsuario(admin);
            return Ok("Usuario administrador creado");
        }
        
    }
}
