using AutoMapper;
using Dapper;
using Restaurants.Common.Data;
using Restaurants.Common.DTOs;
using Restaurants.Common.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurants.Common.Repositories
{
    public class RestaurantRepository : IRestaurantRepository
    {
        private readonly IRestaurantContext _context;
        private readonly IMapper _mapper;

        public RestaurantRepository(IRestaurantContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<bool> CreateRestaurant(CreateRestaurantDTO restaurantDTO)
        {
            using var connection = _context.GetConnection();

            var affectedRows = await connection.ExecuteAsync(
                "INSERT INTO Restaurant (RestaurantName, Address) VALUES (@RestaurantName, @Address)",
                new { restaurantDTO.RestaurantName, restaurantDTO.Address}
                );

            return affectedRows != 0;
        }

        public async Task<bool> DeleteRestaurant(int restaurantId)
        {
            using var connection = _context.GetConnection();

            var affectedRows = await connection.ExecuteAsync("DELETE FROM Restaurant WHERE ID = @RestaurantId",
                                                             new { RestaurantId = restaurantId });

            // delete menu for selected restaurant
            await connection.ExecuteAsync("DELETE FROM Menu WHERE RestaurantID = @RestaurantId",
                                          new { RestaurantId = restaurantId });


            return affectedRows != 0;
        }

        public async Task<RestaurantDTO> GetRestaurant(string restaurantName)
        {
            using var connection = _context.GetConnection();

            var restaurant = await connection.QueryFirstOrDefaultAsync<Restaurant>(
                "SELECT * FROM Restaurant WHERE RestaurantName = @RestaurantName", 
                new {RestaurantName = restaurantName }
                );

            if (restaurant != null)
            {
                var menu = await connection.QueryAsync<MenuItem>(
                    "SELECT MealID AS ID, MealName, Price FROM Menu WHERE RestaurantID = @RestaurantID",
                    new { RestaurantId = restaurant.Id }
                    );

                var res = _mapper.Map<RestaurantDTO>(restaurant);
                res.Menu = _mapper.Map<List<MenuItemDTO>>(menu);

                return res;
            }

            return null;

        }

        public async Task<bool> UpdateRestaurantInfo(RestaurantDTO restaurantDTO)
        {
            using var connection = _context.GetConnection();

            var affectedRows = await connection.ExecuteAsync(
                "UPDATE Restaurant SET RestaurantName=@RestaurantName, Address=@Address WHERE Id = @Id",
                new { restaurantDTO.RestaurantName, restaurantDTO.Address, restaurantDTO.Id });

            return affectedRows != 0;
        }


        // Edit Menu

        public async Task<bool> AddToMenu(int restaurantId, MenuItemDTO menuItemDTO)
        {
            using var connection = _context.GetConnection();

            var affectedRows = await connection.ExecuteAsync(
                "INSERT INTO Menu (RestaurantID, MealID, MealName, Price) VALUES " +
                "(@RestaurantID, @MealID, @MealName, @Price)",
                new { RestaurantID = restaurantId, MealID = menuItemDTO.Id, menuItemDTO.MealName, menuItemDTO.Price});

            return affectedRows != 0;
        }

        public async Task<bool> DeleteFromMenu(int restaurantId, string mealId)
        {
            using var connection = _context.GetConnection();

            var affectedRows = await connection.ExecuteAsync("DELETE FROM Menu WHERE " +
                                                             "RestaurantID = @RestaurantId AND MealID = @MealId",
                                                             new { RestaurantId = restaurantId, MealId = mealId });

            return affectedRows != 0;
        }

        public async Task<bool> UpdateMealInMenu(int restaurantId, MenuItemDTO menuItemDTO)
        {
            using var connection = _context.GetConnection();

            var affectedRows = await connection.ExecuteAsync(
                "UPDATE Menu SET MealName=@MealName, Price=@Price WHERE " +
                "RestaurantID=@RestaurantId AND MealID=@MealId",
                new {menuItemDTO.MealName, menuItemDTO.Price, RestaurantId = restaurantId, MealId = menuItemDTO.Id});

            return affectedRows != 0;
        }



        // gRPC 
        public async Task<IEnumerable<RestaurantDTO>> GetRestaurantsByMeal(string mealID)
        {
            using var connection = _context.GetConnection();

            var restaurants = await connection.QueryAsync<Restaurant>(
                    "SELECT RestaurantID AS ID, RestaurantName, Address " +
                    "FROM Restaurant JOIN Menu " +
                    "ON Restaurant.ID = Menu.RestaurantID " +
                    "WHERE Menu.MealID = @MealID",
                    new { MealID = mealID }
                    );

            return _mapper.Map<IEnumerable<RestaurantDTO>>(restaurants);
        }
    }
}
