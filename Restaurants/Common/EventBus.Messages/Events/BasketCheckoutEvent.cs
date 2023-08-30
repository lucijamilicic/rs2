using EventBus.Messages.Entities;

namespace EventBus.Messages.Events;

public class BasketCheckoutEvent:IntegrationBaseEvent
{
    //Address
    public string BuyerUsername { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string ZipCode { get; set; }
    public string EmailAddress { get; set; }

    public string BuyerId { get; set; }
    public decimal TotalPrice { get; set; }
    public IEnumerable<BasketItem> OrderItems { get; set; }
}