using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public decimal Precio { get; set; }
        public string Categoria { get; set; }
        public string Descripcion { get; set; }
        public int Stock { get; set; }


        //FK -ItemOrdenDeCompra 1-1
        public ItemOrdenDeCompra ocItem { get; set; }
        //FK -FacturaItem 1-1
        public FacturaItem facturaItem { get; set; }


        //Fk -carrito
        public ICollection<ItemCarrito> ItemsEnCarrito { get; set; }

    }
}
