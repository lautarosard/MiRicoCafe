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

        public MercadoPagoService(IConfiguration config, IProductoService productoService)
        {
            _config = config;
            _productoService = productoService;
        }

        public async Task<string> CrearPreferenciaAsync(PagoRequest request)
        {
            MercadoPagoConfig.AccessToken = _config["MercadoPago:AccessToken"];

            var items = new List<PreferenceItemRequest>();

            foreach (var item in request.MPProductos)
            {
                Console.WriteLine($"El producto es este {item.ProductoId}");
                var producto = await _productoService.ConsultarProducto(item.ProductoId);

                if (producto == null)
                {
                    throw new Exception($"No se encontró el producto con ID {item.ProductoId}");
                }
                if (producto == null)
                {
                    // Omitir o loguear el producto inválido
                    Console.WriteLine($"El producto que intentaste fue este {item}");
                    continue;
                }
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
                    Success = "https://tudominio.com/pago/exito",
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
