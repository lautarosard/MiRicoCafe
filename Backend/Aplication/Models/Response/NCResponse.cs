using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Response
{
    public class NCResponse
    {
        public int IdNotaDeCredito { get; set; }
        public DateTime FechaEmision { get; set; }
        public string DireccionEmpresa { get; set; }
        public int TelefonoEmpresa { get; set; }
        public string CUIT { get; set; }
        public int CUILCliente { get; set; }
        public string NombreCliente { get; set; }
        public string LocalidadCliente { get; set; }
        public string DireccionCliente { get; set; }
        public float IVA { get; set; }
        public float Importe { get; set; }
        public float Total { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public float ValorModificacion { get; set; }
    }
}
