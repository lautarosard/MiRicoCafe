using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class FacturaItem
    {
        public int Id { get; set; }

        //FK -Fatura 1-X
        public int FacturaId { get; set; }
        public Factura Factura { get; set; } = null!;

        //FK -Producto 1-1
        public int ProductoId { get; set; }
        public Producto Producto { get; set; } = null!;

        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Subtotal => Cantidad * PrecioUnitario;
    }
}
