﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IAdministrador
{
    public interface IAdministradorCommand
    {
        Task InsertAdministrador(Administrador Administrador);
        Task RemoveAdministrador(Administrador Administrador);
        Task UpdateAdministrador(Administrador Administrador);
    }
}
