﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Response
{
    public class FacturaItemResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }
        //FK -Fatura 1-X
        public int FacturaId { get; set; }

        //FK -Producto 1-1
        public int ProductoId { get; set; }

        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Subtotal => Cantidad * PrecioUnitario;

    }
}
