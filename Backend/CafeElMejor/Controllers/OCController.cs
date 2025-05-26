using Aplication.Exceptions;
using Aplication.Interfaces.IOC;
using Aplication.Models.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CafeElMejor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OCController : ControllerBase
    {
        private readonly IOCService _service;

        public OCController(IOCService service)
        {
            _service = service;
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> CreateOrdenDeCompra(OCRequest request)
        {

            try
            {
                var result = await _service.CreateOrdenDeCompra(request);
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
        [HttpGet("OrdenDeCompra/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetByOrdenDeCompraId(int id)
        {

            try
            {
                var result = await _service.ConsultarOrdenDeCompra(id);
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

        [HttpPut("OrdenDeCompraupdate/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdataOrdenDeCompra(int id, [FromBody] OCRequest requests)
        {

            try
            {

                var result = await _service.UpdateOrdenDeCompra(id, requests);

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

        [HttpDelete("OrdenDeCompradelete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteOrdenDeCompraId(int id)
        {


            try
            {
                var result = await _service.EliminarOrdenDeCompra(id);
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
