using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;

        public string Rol { get; set; } // <-- Ej: "Admin" o "Cliente"

        // Relaciones opcionales con Cliente o Admin
        public int? ClienteId { get; set; }
        public Cliente? Cliente { get; set; }



    }
}
