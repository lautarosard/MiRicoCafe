using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class FacturaRequest
    {
        public DateTime FechaEmision { get; set; }
        public string DireccionEmpresa { get; set; }
        public int TelefonoEmpresa { get; set; }
        public int CUIT { get; set; }
        public int CUILCliente { get; set; }
        public string NombreCliente { get; set; }
        public string LocalidadCliente { get; set; }
        public string DireccionCliente { get; set; }
        public float IVA { get; set; }
        public float Importe { get; set; }
        public float Total { get; set; }
        public DateTime FechaVencimiento { get; set; }

        public int IdCobranza { get; set; }

        public int IdCliente { get; set; }
    }
}
