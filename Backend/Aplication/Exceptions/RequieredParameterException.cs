using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Exceptions
{
    public class RequieredParameterException: Exception
    {
        public RequieredParameterException(string message) : base(message)
        {
        }
    }
}
