using Restaurants.Common.DTOs;
using Restaurants.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurants.Common.Repositories
{
    public interface IRestaurantRepository
    {
        Task<RestaurantDTO> GetRestaurant(string restaurantName); // restaurant info + menu
        Task<bool> CreateRestaurant(CreateRestaurantDTO restaurantDTO);
        Task<bool> UpdateRestaurant(RestaurantDTO restaurantDTO);
        Task<bool> DeleteRestaurant(string restaurantName);
        Task<IEnumerable<RestaurantDTO>> GetRestaurantsByMeal(int  mealID);


    }
}
