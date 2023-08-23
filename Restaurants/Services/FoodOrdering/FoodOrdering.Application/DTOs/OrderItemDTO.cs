namespace FoodOrdering.Application.Common;

public class OrderItemDTO
{
    // EntityBase
    //public int Id { get; set; }

    // OrderItem
    public string RestaurantName { get; set; }
    //public string RestaurantId { get; set; }
    //public string RestaurantAddress { get; set; }//TODO: Mozda ne treba
    public List<FoodItemDTO> FoodItems { get; set; }

    public decimal TotalPrice { get; set; }

}