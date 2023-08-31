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
        Task<bool> UpdateRestaurantInfo(RestaurantDTO restaurantDTO);
        Task<bool> DeleteRestaurant(int restaurantId);
        Task<IEnumerable<RestaurantDTO>> GetRestaurantsByMeal(string  mealID);
        Task<bool> AddToMenu(int restaurantId, MenuItemDTO menuItemDTO);
        Task<bool> UpdateMealInMenu(int restaurantId, MenuItemDTO menuItemDTO);
        Task<bool> DeleteFromMenu(int restaurantId, string mealId);
    }
}
