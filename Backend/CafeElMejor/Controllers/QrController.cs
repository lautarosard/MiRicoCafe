using Aplication.Interfaces.IQR;
using Microsoft.AspNetCore.Mvc;

namespace CafeElMejor.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QrController : ControllerBase
    {
        private readonly IGenerarQrService _qrService;

        public QrController(IGenerarQrService qrService)
        {
            _qrService = qrService;
        }

        [HttpGet("generar")]
        public IActionResult Generar([FromQuery] string contenido)
        {
            if (string.IsNullOrWhiteSpace(contenido))
                return BadRequest("El contenido no puede estar vacío.");

            var base64Qr = _qrService.GenerarQr(contenido);
            return Ok(new { QrBase64 = base64Qr });
        }
    }

}
