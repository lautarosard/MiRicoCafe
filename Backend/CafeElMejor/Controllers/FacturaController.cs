using Aplication.Exceptions;
using Aplication.Interfaces.IFactura;
using Aplication.Interfaces.IOC;
using Aplication.Models.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CafeElMejor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturaController : ControllerBase
    {
        private readonly IFacturaService _service;

        public FacturaController(IFacturaService service)
        {
            _service = service;
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> CreateFactura(PagoRequest request)
        {

            try
            {
                var result = await _service.CreateFactura(request);
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
                return BadRequest(new { message = $"A mistake has occurred.{ex}" });
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
        [HttpGet("Factura/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        
        public async Task<IActionResult> GetByFacturaId(int id)
        {

            try
            {
                var result = await _service.ConsultarFactura(id);
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
