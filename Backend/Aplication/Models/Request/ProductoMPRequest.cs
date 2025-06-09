using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class ProductoMPRequest
    {
        public string Titulo { get; set; } = null!;
        public decimal Precio { get; set; }
        public int Cantidad { get; set; }
        public string Moneda { get; set; } = "ARS";
    }
}
