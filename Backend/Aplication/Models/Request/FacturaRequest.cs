using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class FacturaRequest
    {
        //public DateTime FechaEmision { get; set; }
        public string DireccionEmpresa { get; set; }
        public int TelefonoEmpresa { get; set; }
        public int CUIT { get; set; }
        public bool Estado { get; set; }
        //public float Importe { get; set; }
        public float Total { get; set; }

        public int IdCobranza { get; set; }

        public int IdCliente { get; set; }
        public List<FacturaItemRequest> Detalles { get; set; } = new();
    }
}
