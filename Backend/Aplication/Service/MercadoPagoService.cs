using Aplication.Interfaces.IMercadoPago;
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

        public MercadoPagoService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<string> CrearPreferenciaAsync(PagoRequest request)
        {
            // Inicializar el SDK una vez (idealmente debería estar en el startup o constructor de un singleton)
            MercadoPagoConfig.AccessToken = _config["MercadoPago:AccessToken"];

            // Mapear tus productos (si es uno solo, usás uno; si hay varios, cambiás esto)
            var items = request.MPProductos.Select(p => new PreferenceItemRequest
            {
                Title = p.Titulo,
                Quantity = p.Cantidad,
                CurrencyId = p.Moneda,
                UnitPrice = p.Precio
            }).ToList();

            var preferenciaRequest = new PreferenceRequest
            {
                Items = items,
                BackUrls = new PreferenceBackUrlsRequest
                {
                    Success = "https://localhost:7069/pago/exito",
                    Failure = "https://localhost:7069/pago/fallo",
                    Pending = "https://localhost:7069/pago/pendiente"
                },
                AutoReturn = "approved"
            };

            var client = new PreferenceClient();
            Preference preference = await client.CreateAsync(preferenciaRequest);

            return preference.InitPoint; // URL del checkout de Mercado Pago
        }

    }
}
