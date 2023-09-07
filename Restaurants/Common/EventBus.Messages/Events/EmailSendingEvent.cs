using EventBus.Messages.Entities;

namespace EventBus.Messages.Events;

public class EmailSendingEvent
{
    //restaurant email and name
    public string RestaurantEmail { get; set; }
    public string RestaurantName { get; set; }
    public string RestaurantEmailAddress { get; set; }

    //TODO: izbaci visak
    
    //User Info
    public string BuyerUsername { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string ZipCode { get; set; }
    public string BuyerEmailAddress { get; set; }

    //OrderItems
    public IEnumerable<FoodItem> FoodOrder { get; set; }
 //   public decimal TotalPrice { get; set; }

}