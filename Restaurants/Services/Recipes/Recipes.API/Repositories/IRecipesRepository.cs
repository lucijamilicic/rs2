using Recipes.API.DTO;
using Recipes.API.Entities;

namespace Recipes.API.Repositories
{
    public interface IRecipesRepository
    {
        Task<IEnumerable<Dish>> GetRecipes();
        Task<Dish?> GetRecipeById(string id);
        Task<IEnumerable<Dish>> GetRecipesByCategory(string category);
        Task<IEnumerable<Dish>> GetRecipesByName(string name);
        Task<IEnumerable<string>> GetAllCategories();
        Task AddRecipe(AddRecipeDTO dish);
    }
}

