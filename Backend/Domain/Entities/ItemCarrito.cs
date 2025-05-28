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
        public int ClienteId { get; set; }
        public int Cantidad {  get; set; }

        public Cliente Cliente { get; set; }
        public Producto Producto { get; set; }

    }
}
