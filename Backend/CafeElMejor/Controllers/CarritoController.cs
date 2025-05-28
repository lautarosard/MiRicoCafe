using Aplication.Interfaces.IAdministrador;
using Aplication.Models.Request;
using Microsoft.AspNetCore.Mvc;

namespace CafeElMejor.Controllers
{
    public class CarritoController : Controller
    {
        private readonly IItemCarritoService _carritoService;

        public CarritoController(IItemCarritoService carritoService)
        {
            _carritoService = carritoService;
        }

        [HttpGet("{clienteId}")]
        public async Task<ActionResult<CarritoResponse>> ObtenerCarrito(int clienteId)
        {
            var carrito = await _carritoService.ObtenerCarrito(clienteId);
            return Ok(carrito);
        }

        [HttpPost("{clienteId}")]
        public async Task<IActionResult> AgregarItem(int clienteId, ItemCarritoRequest request)
        {
            await _carritoService.AgregarItem(clienteId, request);
            return Ok();
        }

        [HttpPut("{clienteId}/{productoId}")]
        public async Task<IActionResult> ActualizarCantidad(int clienteId, int productoId, [FromBody] int cantidad)
        {
            await _carritoService.ActualizarCantidad(clienteId, productoId, cantidad);
            return Ok();
        }

        [HttpDelete("{clienteId}/{productoId}")]
        public async Task<IActionResult> EliminarItem(int clienteId, int productoId)
        {
            await _carritoService.EliminarItem(clienteId, productoId);
            return Ok();
        }

        [HttpDelete("{clienteId}")]
        public async Task<IActionResult> VaciarCarrito(int clienteId)
        {
            await _carritoService.VaciarCarrito(clienteId);
            return Ok();
        }
    }
}
