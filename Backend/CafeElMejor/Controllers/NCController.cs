using Aplication.Exceptions;
using Aplication.Interfaces.INC;
using Aplication.Models.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CafeElMejor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NCController : ControllerBase
    {
        private readonly INCService _service;

        public NCController(INCService service)
        {
            _service = service;
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> CreateNotaDeCredito(NCRequest request)
        {

            try
            {
                var result = await _service.CreateNotaDeCredito(request);
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
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAll()
        {

            var result = await _service.GetAll();
            return new JsonResult(result);
        }
        [HttpGet("NotaDeCredito/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetByNotaDeCreditoId(int id)
        {

            try
            {
                var result = await _service.ConsultarNotaDeCredito(id);
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
