using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Response
{
    public class AdministradorResponse
    {
         //atributos
        public int IdAdministrador { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public int Dni {  get; set; }
    }
}
