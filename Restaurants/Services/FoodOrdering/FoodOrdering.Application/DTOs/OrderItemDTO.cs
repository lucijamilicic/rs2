namespace FoodOrdering.Application.Common;

public class OrderItemDTO
{
    // EntityBase
    //public int Id { get; set; }
    public string RestaurantName { get; set; }
    public string RestaurantId { get; set; }
    //Restaurant Address
    public string Street { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string ZipCode { get; set; }
    //TODO: fali adresa
    public IEnumerable<FoodItemDTO> FoodOrder { get; set; }


}