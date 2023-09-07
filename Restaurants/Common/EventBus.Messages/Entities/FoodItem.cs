namespace EventBus.Messages.Entities;

public class FoodItem
{
    public string DishName { get; set; }
    public string DishId { get; set; }
    public string ExtraNote { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }

}