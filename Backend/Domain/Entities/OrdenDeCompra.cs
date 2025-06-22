using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class OrdenDeCompra 
    {
        public int Id {  get; set; }
        public DateTime Fecha { get; set; }
        //public int Cantidad { get; set; }
        //public float PUnitario { get; set; }
        //public float Importe { get; set; }
        public float Total { get; set; }

        //FK - relaciones 1-1
        public int IdProveedor { get; set; } // Cambia el nombre para convención EF
        public Proveedor Proveedor { get; set; }

        //productos 1- X
        public ICollection<ItemOrdenDeCompra> DetalleOrdenDeCompra { get; set; }
     
    }
}
