using Aplication.Interfaces.IAuth;
using Aplication.Interfaces.ICliente;
using Aplication.Models.Request;
using Aplication.Service;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace CafeElMejor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService  _service;

        public AuthController(IAuthService service)
        {
            _service = service;
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
                var token = await _service.LoginAsync(request.Usuario, request.Password);
                return Ok(new { Token = token });
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
    }
}
