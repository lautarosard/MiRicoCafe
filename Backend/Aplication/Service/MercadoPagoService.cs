using Aplication.Interfaces.IMercadoPago;
using Aplication.Interfaces.IProducto;
using Aplication.Models.Request;
using MercadoPago.Client.Preference;
using MercadoPago.Config;
using MercadoPago.Resource.Preference;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Aplication.Service
{
    public class MercadoPagoService : IMercadoPagoService
    {
        private readonly IConfiguration _config;
        private readonly IProductoService _productoService;

        public MercadoPagoService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<string> CrearPreferenciaAsync(PagoRequest request)
        {
            MercadoPagoConfig.AccessToken = _config["MercadoPago:AccessToken"];

            var items = new List<PreferenceItemRequest>();

            foreach (var item in request.MPProductos)
            {
                var producto = await _productoService.ConsultarProducto(item.ProductoId);

                items.Add(new PreferenceItemRequest
                {
                    Title = producto.Nombre, // Nombre desde BD
                    Quantity = item.Cantidad,
                    CurrencyId = "ARS", // Moneda fija o desde BD si varía
                    UnitPrice = producto.Precio // Precio desde BD
                });
            }

            var preferenciaRequest = new PreferenceRequest
            {
                Items = items,
                BackUrls = new PreferenceBackUrlsRequest
                {
                    Success = "http://localhost/Frontend/CafeElMejorFrontEcommerce/HTML/index.html",
                    Failure = "https://tudominio.com/pago/fallo",
                    Pending = "https://tudominio.com/pago/pendiente"
                },
                AutoReturn = "approved"
            };

            var client = new PreferenceClient();
            Preference preference = await client.CreateAsync(preferenciaRequest);

            return preference.InitPoint;
        }

    }
}
