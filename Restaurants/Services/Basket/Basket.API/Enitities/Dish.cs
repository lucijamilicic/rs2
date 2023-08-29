namespace Basket.API.Enitities
{
    public class Dish
    {
        public string DishName { get; set; }
        public string DishId { get; set; }
        public string ExtraNote { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        
        //TODO:mozda ovo ne treba
        //public string Description { get; set; }



    }
}
