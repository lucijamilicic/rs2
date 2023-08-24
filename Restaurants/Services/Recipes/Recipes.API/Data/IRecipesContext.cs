using MongoDB.Driver;
using Recipes.API.Entities;

namespace Recipes.API.Data
{
    public interface IRecipesContext
    {
        IMongoCollection<Dish> Recipes { get; }
    }    
}

