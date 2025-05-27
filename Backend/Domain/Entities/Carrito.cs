using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ItemCarrito
    {
        //atributos
        public int Id { get; set; }
        public int ProductoId { get; set; }
        public Producto producto { get; set; }
        public int Cantidad {  get; set; }

    }
}
