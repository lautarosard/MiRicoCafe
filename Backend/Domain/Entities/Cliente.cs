using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Cliente
    {
        //atributos
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public int Dni {  get; set; }

        public ICollection<ItemCarrito> Carrito { get; set; } = new List<ItemCarrito>();

        //Fk -Factura 1-x
        public ICollection<Factura> Facturas { get; set; }

        //FK - Usuario 1-1
        public Usuario Usuario { get; set; }
    }
}
