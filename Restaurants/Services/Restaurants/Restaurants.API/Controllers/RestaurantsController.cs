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

        [HttpGet("{restaurantName}")]
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
    }
}
