﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Aplication.Interfaces.ICobranza
{
    public interface ICobranzaQuery
    {
        List<Cobranza> GetOrdenDeCompraQuery();
        Task<Cobranza> GetById(int id);
    }
}
