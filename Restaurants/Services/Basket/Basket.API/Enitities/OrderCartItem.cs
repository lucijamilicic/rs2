using Microsoft.AspNetCore.Cors;

namespace Basket.API.Enitities
{
    public class OrderCartItem
    {

       public string RestaurantName { get; set; }

       public string RestaurantId { get; set; }
      
       public List<Dish> Dishes { get; set; } = new List<Dish>();

       public decimal TotalPrice
        {
            get
            {
                decimal total = 0;
                foreach (var dish in Dishes)
                {
                    total += dish.Price * dish.Quantity;
                }
                return total;
            }
        }




    }
}
