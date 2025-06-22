using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Response
{
    public class ItemOCResponse
    {
        public int Id { get; set; }

        //FK OrdenDeCompra 1-X
        public int IdOrdenDeCompra { get; set; }
        //public OrdenDeCompra ordenDeCompra { get; set; } = null!;

        //FK producto 1-1
        public int ProductoId { get; set; }
        //public Producto Producto { get; set; } = null!;

        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
    }
}
