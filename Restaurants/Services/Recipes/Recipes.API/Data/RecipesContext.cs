using MongoDB.Driver;
using Recipes.API.Entities;

namespace Recipes.API.Data;

public class RecipesContext : IRecipesContext
{
    public RecipesContext(IConfiguration configuration)
    {
        var client = new MongoClient(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
        var database = client.GetDatabase("RecipesDB");
        
        Recipes = database.GetCollection<Dish>("Recipes");
        RecipesContextSeed.SeedData(Recipes);
    }

    public IMongoCollection<Dish> Recipes { get; }
}