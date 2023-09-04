using Recipes.API.Entities;

namespace Recipes.API.DTO;

public class AddRecipeDTO
{
    public string Name { get; set;}
    public string Category { get; set;}
    public List<Ingredient> ListOfIngredients { get; set; }
    public string Recipe { get; set; }
    public string ImageUrl { get;  set;}
    public string TutorialVideoUrl { get; set;  }
}