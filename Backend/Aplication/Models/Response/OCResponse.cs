﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Models.Response
{
    public class OCResponse
    {
        public int IdOrdenDeCompra {  get; set; }
        public DateTime Fecha { get; set; }
        //public int Cantidad { get; set; }
        public float Total { get; set; }
        
        //public float PUnitario { get; set; }
        //public float Importe { get; set; }
        //public int IdProveedor { get; set; } 
        public ProveedorResponse Proveedor { get; set; }

        public ICollection<ItemOCResponse> Detalles { get; set; }

    }
}
