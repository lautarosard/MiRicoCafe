using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Interfaces.IProveedor
{
    public interface IProveedorCommand 
    {
        Task InsertProveedores(Proveedor proveedor);
        Task RemoveProveedores(Proveedor proveedor);
        Task UpdateProveedores(Proveedor proveedor);

    }
}
