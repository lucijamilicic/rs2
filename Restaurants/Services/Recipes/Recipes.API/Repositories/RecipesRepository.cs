using MongoDB.Driver;
using Recipes.API.Data;
using Recipes.API.Entities;

namespace Recipes.API.Repositories
{
    public class RecipesRepository: IRecipesRepository
    {
        private readonly IRecipesContext _context;

        public RecipesRepository(IRecipesContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        
        public async Task<IEnumerable<Dish>> GetRecipes()
        {
            return await _context.Recipes.Find(p => true).ToListAsync();
        }
        
        public async Task<Dish?> GetRecipeById(string id)
        {
            return await _context.Recipes.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Dish>> GetRecipesByCategory(string category)
        {
            return await _context.Recipes.Find(p => p.Category.ToLower().Contains(category.ToLower())).ToListAsync();
        }
        
        public async Task<IEnumerable<Dish>> GetRecipesByName(string name)
        {
            return await _context.Recipes.Find(p => p.Category.ToLower().Contains(name.ToLower())).ToListAsync();
        }
    }
}

