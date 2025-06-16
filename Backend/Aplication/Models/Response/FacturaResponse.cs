using Aplication.Models.Request;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Response
{
    public class FacturaResponse
    {
        public int IdFactura { get; set; }
        public DateTime FechaEmision { get; set; }
        public string DireccionEmpresa { get; set; }
        public int TelefonoEmpresa { get; set; }
        public int CUIT { get; set; }
        public bool Estado { get; set; }
        public float Importe { get; set; }
        public float Total { get; set; }
  
        public ClienteResponse Cliente { get; set; }
        public Cobranza Cobranza { get; set; }

        public List<FacturaItemResponse> Detalles { get; set; }
    }
}
