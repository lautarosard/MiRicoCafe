using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class ProveedorRequest
    {
        //atributos - No necesita el ID
        public string Nombre { get; set; }
        public string Email { get; set; }
        public int Telefono { get; set; }
        public string Provincia { get; set; }
        public string Localidad { get; set; }
        public string Direccion {  get; set; }
        public int Cuit { get; set; }
    }
}
