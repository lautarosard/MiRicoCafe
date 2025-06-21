using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class UsuarioResponse
    {
        public int IdUsuario {  get; set; }
        public string Username { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;

        public string Rol { get; set; } = null!;

    }
}
