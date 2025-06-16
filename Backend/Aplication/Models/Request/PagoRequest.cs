using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class PagoRequest
    {
        public int ClienteId { get; set; }
        public List<ProductoMPRequest> MPProductos { get; set; } = new();
    }
}
