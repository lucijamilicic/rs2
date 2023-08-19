namespace Basket.API.Enitities
{
    public class Dish
    {
        public string DishId { get; set; }
       
        public string DishName { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }

        public string ExtraNote { get; set; }

    }
}
