namespace FoodOrdering.Application.Common;

public class OrderDTO
{
    // EntityBase
    public Guid Id { get; set; }

    public DateTime CreationDate { get; set; }

    // Address
    public string DeliveryAddress { get; set; }

    public string BuyerEmailAddress { get; set; }

    // Order
    //public string BuyerId { get; set; }
    public string BuyerUsername { get; set; }
    public decimal TotalPrice { get; set; }
    public IEnumerable<OrderItemDTO> OrderItems { get; set; }
}