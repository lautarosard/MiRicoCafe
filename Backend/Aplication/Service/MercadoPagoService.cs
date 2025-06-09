using Aplication.Interfaces.IMercadoPago;
using Aplication.Models.Request;
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
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        public MercadoPagoService(HttpClient httpClient, IConfiguration config) 
        {
            _config = config;
            _httpClient = httpClient;
        }

        public async Task<string> CrearPreferenciaAsync(PagoRequest request)
        {
            var accessToken = _config["MercadoPago:AccessToken"]; // guardalo en appsettings

            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", accessToken);

            var body = new
            {
                items = new[]
                {
                new
                {
                    title = request.TituloProducto,
                    quantity = request.Cantidad,
                    currency_id = request.Moneda,
                    unit_price = request.Precio
                }
            },
                back_urls = new
                {
                    success = "https://localhost:7069/pago/exito",
                    failure = "https://localhost:7069/pago/fallo",
                    pending = "https://localhost:7069/pago/pendiente"
                },
                auto_return = "approved"
            };
            var content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("https://api.mercadopago.com/checkout/preferences", content);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error al crear preferencia: {error}");
            }

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);
            var initPoint = doc.RootElement.GetProperty("init_point").GetString();

            return initPoint!;
        }

    }
}
