using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class RegistroClienteRequest
    {
        // Datos de usuario (login)
        public string Username { get; set; }
        public string Password { get; set; }

        // Datos del cliente
        public ClienteRequest Cliente { get; set; }

    }
}
