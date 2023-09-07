namespace Basket.API.Enitities
{
    public class OrderCart
    {
        public string BuyerUsername { get; set; }
        public string DeliveryAddress { get; set; }
        public string BuyerEmailAddress { get; set; }

        public List<OrderCartItem> OrderItems { get; set; } 
     
        public OrderCart(string buyerUsername, string deliveryAddress="", string buyerEmailAddress="")
        {
            BuyerUsername = buyerUsername ?? throw new ArgumentNullException(nameof(buyerUsername));
            DeliveryAddress = deliveryAddress ;
            BuyerEmailAddress = buyerEmailAddress;
            OrderItems = new List<OrderCartItem>();
        }

        public decimal TotalPrice
        {
            get
            {
                decimal total = 0;
                foreach (var item in OrderItems)
                {
                    total += item.TotalPrice;
                }
                return total;
            }
        }
    }
}
