namespace EventBus.Messages.Entities;

public class BasketItem
{
    public string RestaurantName { get; set; }

    public string RestaurantId { get; set; }
    
    //order
    public IEnumerable<FoodItem> FoodOrder { get; set; }
    public decimal TotalPrice { get; set; }

}