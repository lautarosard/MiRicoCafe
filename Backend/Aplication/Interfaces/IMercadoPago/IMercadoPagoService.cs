using Aplication.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Interfaces.IMercadoPago
{
    public interface IMercadoPagoService
    {
        Task<string> CrearPreferenciaAsync(PagoRequest request);

    }
}
