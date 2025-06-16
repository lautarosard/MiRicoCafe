using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Factura
    {
        public int Id { get; set; }
        public DateTime FechaEmision { get; set; }
        public string DireccionEmpresa { get; set; }
        public int TelefonoEmpresa { get; set; }
        public int CUIT { get; set; }
        public bool Estado { get; set; }
        public float Importe { get; set; }
        public float Total { get; set; }



        //Fk - Cobranza 1-1
        //public int IdCobranza { get; set; }
        //public Cobranza Cobranza { get; set; }

        //Fk - Cliente 1-X
        public int IdCliente { get; set; }
        public Cliente Cliente { get; set; }

        //Fk - NotaDeCredito 1-1
        //public NotaDeCredito NotaDeCredito { get; set; }

        //Fk - NotaDeDebito 1-1
        //public NotaDeDebito NotaDebito { get; set; }

        //Fk - FacturaItem 1-X
        public List<FacturaItem> Detalles { get; set; } = new();

    }
}
