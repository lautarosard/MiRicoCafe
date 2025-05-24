using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class CobranzaRequest
    {
        public int Total { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }
    }
}
