namespace FoodOrdering.Application.Common;

public class OrderItemDTO
{
    // EntityBase
    //public int Id { get; set; }
    public string RestaurantName { get; set; }
    public string RestaurantId { get; set; }
    public string RestaurantEmailAddress { get; set; }

    public string Street { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string ZipCode { get; set; }

    public string BuyerEmailAddress { get; set; }

    //TODO: fali adresa
    public IEnumerable<FoodItemDTO> FoodOrder { get; set; }
    public decimal TotalPrice { get; set; }

}