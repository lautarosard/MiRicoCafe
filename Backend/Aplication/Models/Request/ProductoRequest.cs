using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class ProductoRequest
    {
        public string Nombre { get; set; }
        public decimal Precio { get; set; }
        public string Categoria { get; set; }
        public string Descripcion { get; set; }
        public int Stock { get; set; }
        public string? imagenUrl { get; set; }
    }
}
