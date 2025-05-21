using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Cliente
    {
        //Constructor
        public Cliente(string nombre, string email, int dni) 
        {
            Nombre = nombre;
            Email = email;
            Dni = dni;
            
        }
        public Cliente() { }

        //atributos
        public int IdCliente { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public int Dni {  get; set; }
    }
}
