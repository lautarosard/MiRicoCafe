using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IAdministrador
{
    public interface IAdministradorQuery
    {
        List<Administrador> GetAdministradorQuery();
        Task<Administrador> GetById(int id);

        Task<Administrador> GetByDNI(int id);
    }
}
