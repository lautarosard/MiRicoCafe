using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Cobranza
    {
        public int Id { get; set; }
        public int Total { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }

        //Fk - Factura 1-1
        //public Factura Factura { get; set; }

    }
}
