namespace Basket.API.Enitities
{
    public class OrderCart
    {
        //public Guid Id { get; set; }
       // public DateTime CreationDate { get; set; }
        public string BuyerUsername { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string EmailAddress { get; set; }

        public string BuyerId { get; set; }

        public IEnumerable<OrderCartItem> OrderItems { get; set; } = new List<OrderCartItem>();

        //TODO: ovo mozda skloniti
        public OrderCart() { }

        public OrderCart(string username)
        {
            BuyerUsername = username ?? throw new ArgumentNullException(nameof(username));
        }

        public decimal TotalPrice
        {
            get
            {
                decimal total = 0;
                foreach (var item in OrderItems)
                {
                    foreach (var food in item.FoodOrder)
                    {
                        total += food.Price;
                    }
                }
                return total;
            }
        }
    }
}
