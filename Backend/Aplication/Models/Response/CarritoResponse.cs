using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Models.Request
{
    public class CarritoResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public List<ItemCarritoResponse> Items { get; set; } = new();
        public decimal Total { get; set; }
    }
}
