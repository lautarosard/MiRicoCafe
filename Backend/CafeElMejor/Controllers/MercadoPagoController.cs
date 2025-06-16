using Aplication.Interfaces.IFactura;
using Aplication.Interfaces.IMercadoPago;
using Aplication.Models.Request;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MercadoPagoController : ControllerBase
{
    private readonly IMercadoPagoService _mpService;
    private readonly IFacturaService _FacturaService;

    public MercadoPagoController(IMercadoPagoService mpService, IFacturaService facturaService)
    {
        _mpService = mpService;
        _FacturaService = facturaService;
    }

    [HttpPost("crear-preferencia")]
    public async Task<IActionResult> CrearPreferencia([FromBody] PagoRequest dto)
    {
        var url = await _mpService.CrearPreferenciaAsync(dto);
        
        //Hacer factura por detras
        await _FacturaService.CreateFactura(dto);

        return Ok(new { url });


    }
}
