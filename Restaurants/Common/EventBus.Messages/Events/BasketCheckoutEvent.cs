using EventBus.Messages.Entities;

namespace EventBus.Messages.Events;

public class BasketCheckoutEvent:IntegrationBaseEvent
{
    //Address
    public string BuyerUsername { get; set; }
    public string DeliveryAddress { get; set; }
    public string BuyerEmailAddress { get; set; }

    //public string BuyerId { get; set; }
    public decimal TotalPrice { get; set; }
    public IEnumerable<BasketItem> OrderItems { get; set; }
}