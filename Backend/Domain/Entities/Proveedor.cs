using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Proveedor
    {

        //atributos
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public int Telefono { get; set; }
        public string Provincia { get; set; }
        public string Localidad { get; set; }
        public string Direccion {  get; set; }
        public string CUIT {  get; set; }

        //FK - Orden de compra 1-1
        public OrdenDeCompra OrdenDeCompra { get; set; }
    }
}
