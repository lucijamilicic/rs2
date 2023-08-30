namespace EventBus.Messages.Entities;

public class BasketItem
{
    public string RestaurantName { get; set; }

    public string RestaurantId { get; set; }
    public string RestaurantEmailAddress { get; set; }


    //Address
    public string Street { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string ZipCode { get; set; }
    public string BuyerEmailAddress { get; set; }


    //TODO: dodati email

    //order
    public IEnumerable<FoodItem> FoodOrder { get; set; }
    
}