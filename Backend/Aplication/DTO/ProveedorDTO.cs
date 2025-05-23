using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.DTO
{
    public class ProveedorDTO
    {

        //atributos
        public int IdProveedor { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public int Telefono { get; set; }
        public string Provincia { get; set; }
        public string Localidad { get; set; }
        public int Cuit { get; set; }

    }
}
