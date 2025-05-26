using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IUsuario
{
    public interface IUsuarioQuery
    {
        List<Usuario> GetUsuarioQuery();
        Task<Usuario> GetById(int id);

        Task<Usuario> GetByUsuario(string usuario);
    }
}
