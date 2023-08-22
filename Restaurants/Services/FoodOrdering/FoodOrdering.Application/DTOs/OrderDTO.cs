namespace FoodOrdering.Application.Common;

public class OrderDTO
{
    // EntityBase
    public int Id { get; set; }

    // Address
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Country { get; set; }
    public string ZipCode { get; set; }
    public string EmailAddress { get; set; }

    // Order
    public string BuyerId { get; set; }
    public string BuyerUsername { get; set; }
    public decimal TotalPrice { get; set; }
    public IEnumerable<OrderItemDTO> OrderItems { get; set; }
}