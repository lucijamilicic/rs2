namespace Basket.API.Enitities
{
    public class OrderCart
    {
        public string Username { get; set; }

        public List<OrderCartItem> Items { get; set; } = new List<OrderCartItem>();

        public OrderCart() { }

        public OrderCart(string username)
        {
            Username = username ?? throw new ArgumentNullException(nameof(username));
        }

        public decimal BasketTotalPrice
        {
            get
            {
                decimal total = 0;
                foreach (var item in Items)
                {
                    total += item.TotalPrice;
                }
                return total;
            }
        }
    }
}
