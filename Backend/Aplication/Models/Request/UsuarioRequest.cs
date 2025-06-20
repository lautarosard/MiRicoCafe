using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class UsuarioRequest
    {
        public string Username { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;

    }
}
