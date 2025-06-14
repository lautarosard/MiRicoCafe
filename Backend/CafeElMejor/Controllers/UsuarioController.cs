using Aplication.Exceptions;
using Aplication.Interfaces.IUsuario;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CafeElMejor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsuarioController : Controller
    {
        private readonly IUsuarioService _usuarioService;
        
        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        //GET todos
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAll()
        {

            var result = await _usuarioService.GetAll();
            return new JsonResult(result);
        }

        //GET por ID
        [HttpGet("Usuario/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetByUsuarioId(int id)
        {


            try
            {
                var result = await _usuarioService.ConsultarUsuario(id);
                return new JsonResult(result);
            }
            catch (Aplication.Exceptions.InvalidateParameterException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (RequieredParameterException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "A mistake has occurred." });
            }
        }

        //Eliminar Usuario by ID
        [HttpDelete("UsuarioDelete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteUsuarioId(int id)
        {


            try
            {
                var result = await _usuarioService.EliminarUsuario(id);
                return new JsonResult(result);
            }
            catch (Aplication.Exceptions.InvalidateParameterException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (RequieredParameterException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "A mistake has occurred." });
            }
        }
    }
}
