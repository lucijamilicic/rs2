namespace Basket.API.Enitities;

public class BasketItemDTO
{
    public string buyerUsername { get; set; }
    public string restaurantName { get; set; }
    public string restaurantId { get; set; }
    public string deliveryAddress { get; set; }
    public string buyerEmail { get; set; }
    public Dish orderedItem { get; set; }
}