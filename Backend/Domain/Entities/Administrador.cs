﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Administrador
    {
        //atributos
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public int Dni { get; set; }

        //FK - Usuario
        public Usuario Usuario { get; set; }
    }
}
