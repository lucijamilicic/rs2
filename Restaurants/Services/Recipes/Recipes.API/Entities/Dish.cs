using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Recipes.API.Entities
{
    public class Dish
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set;}
        public string Category { get; set;}
        public List<Ingredient> ListOfIngredients { get; set; }
        public string Recipe { get; set; }
        public string ImageUrl { get;  set;}
        public string TutorialVideoUrl { get; set;  }
        public List<RestaurantInfo> Restaurants { get; set; }

    }
}

