using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IUsuario
{
    public interface IUsuarioCommand
    {
        Task InsertUsuario(Usuario Usuario);
        Task RemoveUsuario(Usuario Usuario);
        Task UpdateUsuario(Usuario Usuario);
    }
}
