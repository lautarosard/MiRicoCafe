using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.ICliente
{
    public interface IClienteQuery
    {
        List<Cliente> GetClienteQuery();
        Task<Cliente> GetById(int id);
    }
}
