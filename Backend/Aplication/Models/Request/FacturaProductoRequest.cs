﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class FacturaProductoRequest
    {
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
    }
}
