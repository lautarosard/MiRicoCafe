using Aplication.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class OCRequest
    {
        public DateTime Fecha { get; set; }
        public int Cantidad { get; set; }
        public float PUnitario { get; set; }
        public float Importe { get; set; }
        public float Total { get; set; }
        public int IdProveedor { get; set; }

        public ICollection<ItemOCRequest> Detalles { get; set; }
    }
}
