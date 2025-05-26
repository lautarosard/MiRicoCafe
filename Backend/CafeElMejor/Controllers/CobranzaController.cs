using Aplication.Exceptions;
using Aplication.Interfaces.ICobranza;
using Aplication.Models.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CafeElMejor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CobranzaController : ControllerBase
    {
        private readonly ICobranzaService _service;

        public CobranzaController(ICobranzaService service)
        {
            _service = service;
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> CreateCobranza(CobranzaRequest request)
        {

            try
            {
                var result = await _service.CreateCobranza(request);
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
        [HttpGet("Cobranza/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetByCobranzaId(int id)
        {

            try
            {
                var result = await _service.ConsultarCobranza(id);
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

        [HttpPut("Cobranzaupdate/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdataCobranza(int id, [FromBody] CobranzaRequest requests)
        {

            try
            {

                var result = await _service.UpdateCobranza(id, requests);

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

        [HttpDelete("Cobranzadelete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteCobranzaId(int id)
        {


            try
            {
                var result = await _service.EliminarCobranza(id);
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
