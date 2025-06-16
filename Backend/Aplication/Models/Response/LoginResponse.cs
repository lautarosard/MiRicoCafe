using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public int? ClienteId { get; set; } = null!;
        public string Username { get; set; } = null!;

    }
}
