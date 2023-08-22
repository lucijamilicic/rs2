namespace FoodOrdering.Application.Common;

public class FoodItemDTO
{
    // EntityBase
    public int Id { get; set; }

    // OrderItem
    public string FoodName { get; set; }
    public string FoodId { get; set; }
    public decimal Price { get; set; }//TODO: Mozda TotalPrice
    public int Units { get; set; }
}