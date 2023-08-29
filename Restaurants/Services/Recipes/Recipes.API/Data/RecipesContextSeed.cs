using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Recipes.API.Entities;
using System;
using MongoDB.Driver.Linq;

namespace Recipes.API.Data
{
    public class RecipesContextSeed
    {
        public static void SeedData(IMongoCollection<Dish> recipesCollection)
        {
            var existRecipes = recipesCollection.Find(r => true).Any();
            if (!existRecipes)
            {
                recipesCollection.InsertManyAsync(GetData());
            }
        }

        private static IEnumerable<Dish> GetData()
        {
            var recipesJson =  System.IO.File.ReadAllText("Recipes.json");
            var document = BsonSerializer.Deserialize<IList<BsonDocument>>(recipesJson);
            var listOfRecipes = new List<Dish>();
            for (int i = 0; i < document.Count; i++)
            {
                var recipe = document[i];
                var ingredients = recipe.GetElement("strIngredients").Value.AsBsonArray;
                var listOfIngredients = new List<Ingredient>();
                for (int j = 0; j < ingredients.Count; j++)
                {
                    var ingredient = new Ingredient()
                    {
                        Name = ingredients[j].AsBsonDocument.GetElement("name").Value.AsString,
                        Measure = ingredients[j].AsBsonDocument.GetElement("measure").Value.AsString,
                    };
                    listOfIngredients.Add(ingredient);
                }
                var r = new Dish()
                {
                    Id = recipe.GetElement("idMeal").Value.AsString,
                    Name = recipe.GetElement("strMeal").Value.AsString,
                    Category = recipe.GetElement("strCategory").Value.AsString,
                    Recipe = recipe.GetElement("strInstructions").Value.AsString,
                    ImageUrl = recipe.GetElement("strMealThumb").Value.AsString,
                    TutorialVideoUrl = recipe.GetElement("strYoutube").Value.AsString,
                    ListOfIngredients = listOfIngredients,
                };

                listOfRecipes.Add(r);
            }

            return listOfRecipes;
        }
    }
}

