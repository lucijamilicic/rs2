using Microsoft.AspNetCore.Mvc;
using Recipes.API.Data;
using Recipes.API.Entities;
using Recipes.API.GrpcServices;
using Recipes.API.Repositories;

namespace Recipes.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipesRepository _repository;
        private readonly RestaurantsGrpcService _grpcService;
        
        public RecipesController(IRecipesRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Dish>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Dish>>> GetRecipes()
        {
            var recipes = await _repository.GetRecipes();
            return Ok(recipes);
        }
        [Route("[action]/{id}")]
        [HttpGet] 
        [ProducesResponseType(typeof(Dish), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Dish), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Dish>> GetRecipeById(string id)
        {
            var recipe = await _repository.GetRecipeById(id);
            if (recipe is null)
            {
                return NotFound(null);
            }

            var restaurants = await _grpcService.GetRestaurantsByMeal(recipe.Id);

            Console.WriteLine(restaurants);
            var proba = restaurants.Restaurants.ToList();
            Console.WriteLine(proba);

            // IMapper ??? 

            return Ok(recipe);
        }
        
        [Route("[action]/{category}")]
        [HttpGet] 
        [ProducesResponseType(typeof(IEnumerable<Dish>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Dish>>> GetRecipesByCategory(string category)
        {
            var recipes = await _repository.GetRecipesByCategory(category);
            return Ok(recipes);
        }
        
        [Route("[action]/{name}")]
        [HttpGet] 
        [ProducesResponseType(typeof(IEnumerable<Dish>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Dish>>> GetRecipesByName(string name)
        {
            var recipes = await _repository.GetRecipesByName(name);
            return Ok(recipes);
        }
    }
}

