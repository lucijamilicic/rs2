using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Recipes.API.Data;
using Recipes.API.DTO;
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
        private readonly IMapper _mapper;

        public RecipesController(IRecipesRepository repository, IMapper mapper, RestaurantsGrpcService grpcService)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _grpcService = grpcService ?? throw new ArgumentNullException(nameof(grpcService));
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

            var response = await _grpcService.GetRestaurantsByMeal(recipe.Id);
            var restaurants = _mapper.Map<List<RestaurantInfo>>(response.Restaurants);
            recipe.Restaurants = restaurants;
;
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

        [Route("[action]")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<string>>> GetAllCategories()
        {
            var categories = await _repository.GetAllCategories();
            return Ok(categories);
        }
        
        //fix later
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        [ProducesResponseType(typeof(void), StatusCodes.Status201Created)]
        public async Task<ActionResult> AddRecipe([FromBody] AddRecipeDTO dish)
        {
            await _repository.AddRecipe(dish);
            return Ok();
        }
    }
}

