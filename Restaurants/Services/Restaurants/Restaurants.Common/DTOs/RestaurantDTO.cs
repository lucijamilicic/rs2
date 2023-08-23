using Restaurants.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurants.Common.DTOs
{
    public class RestaurantDTO : BaseRestaurantDTO
    {
        public int Id { get; set; }
        public IEnumerable<MenuItemDTO> Menu { get; set; }

    }
}
