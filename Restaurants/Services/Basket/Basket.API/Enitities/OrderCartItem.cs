namespace Basket.API.Enitities
{
    public class OrderCartItem
    {
        public OrderCartItem(string restaurantName, string restaurantId)
        {
            RestaurantName = restaurantName;
            RestaurantId = restaurantId;
            FoodOrder = new List<Dish>();
        }

        public string RestaurantName { get; set; }

       public string RestaurantId { get; set; }
      
       public List<Dish> FoodOrder { get; set; }

       //Address 
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
