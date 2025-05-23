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
        public int CUILCliente { get; set; }
        public string NombreCliente { get; set; }
        public string LocalidadCliente { get; set; }
        public string DireccionCliente { get; set; }
        public float IVA { get; set; }
        public float Importe { get; set; }
        public float Total { get; set; }
        public DateTime FechaVencimiento { get; set; }

        //Fk - Productos 1-X
        public ICollection<Producto> Productos { get; set; }

        //Fk - Cobranza 1-1
        public int IdCobranza { get; set; }
        public Cobranza Cobranza { get; set; }

        //Fk - Cliente 1-X
        public int IdCliente { get; set; }
        public Cliente Cliente { get; set; }

        //Fk - NotaDeCredito 1-1
        public NotaDeCredito NotaDeCredito { get; set; }

        //Fk - NotaDeDebito 1-1
        public NotaDeDebito NotaDebito { get; set; }

    }
}
