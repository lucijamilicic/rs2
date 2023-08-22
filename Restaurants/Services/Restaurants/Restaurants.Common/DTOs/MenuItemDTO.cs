using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurants.Common.DTOs
{
    public class MenuItemDTO
    {
        public int Id { get; set; }
        public string ItemName { get; set; }  
        public int Price { get; set; }
    }
}
