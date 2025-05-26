using Aplication.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Interfaces.IAuth
{
    public interface IAuthService
    {
        Task<string> LoginAsync(string username, string password);
        Task RegistrarUsuarioAsync(RegistroClienteRequest request);

    }
}
