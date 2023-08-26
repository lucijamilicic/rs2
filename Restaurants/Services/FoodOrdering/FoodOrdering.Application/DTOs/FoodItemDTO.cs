namespace FoodOrdering.Application.Common;

public class FoodItemDTO
{
    // EntityBase
    //public int Id { get; set; }

    // OrderItem
    public string DishName { get; set; }
    public string DishId { get; set; }
    public string ExtraNote { get; set; }

    public decimal Price { get; set; }
    public int Quantity { get; set; }
}