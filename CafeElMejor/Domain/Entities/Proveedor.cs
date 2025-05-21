using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Proveedor
    {
        //Constructores
        public Proveedor(string nombre, string email, int telefono, string provincia, string localidad, int cuit) 
        {
            Nombre = nombre;
            Email = email;
            Telefono = telefono;
            Provincia = provincia;
            Localidad = localidad;
            Cuit = cuit;
        }
        public Proveedor() { }

        //atributos
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public int Telefono { get; set; }
        public string Provincia { get; set; }
        public string Localidad { get; set; }
        public int Cuit {  get; set; }

    }
}
