namespace Basket.API.Enitities
{
    public class OrderCartItem
    {

       public string RestaurantName { get; set; }

       public string RestaurantId { get; set; }
      
       public List<Dish> FoodOrder { get; set; } = new List<Dish>();

       //Address
       public string Street { get; set; }
       public string City { get; set; }
       public string Country { get; set; }
       public string ZipCode { get; set; }
       public string EmailAddress { get; set; }
       public decimal TotalPrice
        {
            get
            {
                decimal total = 0;
                foreach (var dish in FoodOrder)
                {
                    total += dish.Price * dish.Quantity;
                }
                return total;
            }
        }
       
    }
}
