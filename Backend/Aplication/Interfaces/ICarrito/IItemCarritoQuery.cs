using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.IItemCarrito
{
    public interface IItemCarritoQuery
    {
        Task<List<ItemCarrito?>> ObtenerItemsDelCarrito(int clienteId);
        Task<ItemCarrito?> ObtenerItemEspecifico(int clienteId, int productoId);
        Task<decimal> CalcularTotalCarrito(int clienteId);
        Task<int> ObtenerCantidadDeItems(int clienteId);
    }
}
