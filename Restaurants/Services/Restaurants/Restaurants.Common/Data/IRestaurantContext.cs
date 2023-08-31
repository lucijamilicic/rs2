using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurants.Common.Data
{
    public interface IRestaurantContext
    {
        NpgsqlConnection GetConnection();
    }
}
