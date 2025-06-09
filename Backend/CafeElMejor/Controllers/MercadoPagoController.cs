using Aplication.Interfaces.IMercadoPago;
using Aplication.Models.Request;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MercadoPagoController : ControllerBase
{
    private readonly IMercadoPagoService _mpService;

    public MercadoPagoController(IMercadoPagoService mpService)
    {
        _mpService = mpService;
    }

    [HttpPost("crear-preferencia")]
    public async Task<IActionResult> CrearPreferencia([FromBody] PagoRequest dto)
    {
        var url = await _mpService.CrearPreferenciaAsync(dto);
        return Ok(new { url });
    }
}
