using Microsoft.AspNetCore.Mvc;
using Restaurants.Common.DTOs;
using Restaurants.Common.Repositories;

namespace Restaurants.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RestaurantsController : ControllerBase
    {
        private readonly IRestaurantRepository _repository;

        public RestaurantsController(IRestaurantRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        [HttpGet("{restaurantName}", Name = "GetRestaurant")]
        [ProducesResponseType(typeof(RestaurantDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]

        public async Task<ActionResult<RestaurantDTO>> GetRestaurant(string restaurantName)
        {
            var restaurant = await _repository.GetRestaurant(restaurantName);

            if (restaurant == null)
            {
                return NotFound();
            }

            return Ok(restaurant);
        }

        [HttpPost]
        [ProducesResponseType(typeof(IEnumerable<RestaurantDTO>), StatusCodes.Status201Created)]
        public async Task<ActionResult<RestaurantDTO>> CreateRestaurant([FromBody] CreateRestaurantDTO restaurantDTO)
        {
            await _repository.CreateRestaurant(restaurantDTO);

            return CreatedAtRoute("GetRestaurant", new { restaurantName = restaurantDTO.RestaurantName }, restaurantDTO);

        }


        [HttpDelete("{restaurantId}", Name = "DeleteRestaurant")]
        [ProducesResponseType(typeof(RestaurantDTO), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteRestaurantById(int restaurantId)
        {
            return Ok(await _repository.DeleteRestaurant(restaurantId));
        }

        [HttpPut]
        [ProducesResponseType(typeof(RestaurantDTO), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateRestaurantInfo([FromBody] RestaurantDTO restaurantDTO)
        {
            return Ok(await _repository.UpdateRestaurantInfo(restaurantDTO));
        }


        // Menu


        [HttpPost("menu/{restaurantId}")]
        [ProducesResponseType(typeof(IEnumerable<MenuItemDTO>), StatusCodes.Status201Created)]
        public async Task<ActionResult> AddToMenu([FromBody] MenuItemDTO menuItemDTO, int restaurantId)
        {
            return Ok(await _repository.AddToMenu(restaurantId, menuItemDTO));
        }


        [HttpDelete("menu/{restaurantId}/{mealId}")]
        [ProducesResponseType(typeof(MenuItemDTO), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteFromMenu(int restaurantId, string mealId)
        {
            return Ok(await _repository.DeleteFromMenu(restaurantId, mealId));
        }

        [HttpPut("menu/{restaurantId}")]
        [ProducesResponseType(typeof(MenuItemDTO), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateMealInMenu([FromBody] MenuItemDTO menuItemDTO, int restaurantId)
        {
            return Ok(await _repository.UpdateMealInMenu(restaurantId, menuItemDTO));
        }
    }
}
