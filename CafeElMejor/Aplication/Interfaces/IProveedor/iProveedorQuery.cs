using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Interfaces.IProveedor
{
    public interface IProveedorQuery
    {
        List<Proveedor> GetProveedoresQuery();
        Task<Proveedor> GetById(int id);



    }
}
