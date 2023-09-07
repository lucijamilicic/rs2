namespace FoodOrdering.Application.Common;

public class OrderItemDTO
{
    // EntityBase
    //public int Id { get; set; }
    public string RestaurantName { get; set; }
    public string RestaurantId { get; set; }
    
    //TODO: fali adresa
    public IEnumerable<FoodItemDTO> FoodOrder { get; set; }
    public decimal TotalPrice { get; set; }

}