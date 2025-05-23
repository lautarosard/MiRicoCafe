using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IProducto
{
    public interface IProductoCommand
    {
        Task InsertProducto(Producto producto);
        Task RemoveProducto(Producto producto);
        Task UpdateProducto(Producto producto);
    }
}
