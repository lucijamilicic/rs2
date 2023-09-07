using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace Basket.API.Enitities.Repositories
{
    public class RedisBasketRepository : IRedisBasketRepository
    {
        private readonly IDistributedCache _cache;

        public RedisBasketRepository(IDistributedCache cache)
        {
            _cache = cache ?? throw new ArgumentNullException(nameof(cache));
        }

        public async Task<OrderCart?> GetBasket(string username)
        {
            var basketString =await _cache.GetStringAsync(username);
            if (!string.IsNullOrEmpty(basketString))
            {
                var res =  JsonConvert.DeserializeObject<OrderCart>(basketString);
                if (res != null)
                {
                    return res;
                }
            }

            var newOrder= new OrderCart(username);
            var newBasketString = JsonConvert.SerializeObject(newOrder);
            
            await _cache.SetStringAsync(username, newBasketString);
            return newOrder;
        }
        
        public async Task<bool> CreateBasket(OrderCart basket)
        {
            var baketString = JsonConvert.SerializeObject(basket);
            await _cache.SetStringAsync(basket.BuyerUsername, baketString);
            return true;
        }
        
        public async Task<bool> UpdateBasket(BasketItemDTO orderedItem)
        {
            var basketString = await _cache.GetStringAsync(orderedItem.buyerUsername);
            var basket = JsonConvert.DeserializeObject<OrderCart>(basketString);

            var newBasketString = "";
            
            foreach (var restaurant in basket.OrderItems)
            {
                if (restaurant.RestaurantId == orderedItem.restaurantId)
                {

                    foreach (var dish in restaurant.FoodOrder)
                    {
                        if (dish.DishId == orderedItem.orderedItem.DishId)
                        {
                            dish.ExtraNote = orderedItem.orderedItem.ExtraNote;
                            dish.Quantity = orderedItem.orderedItem.Quantity;
                            newBasketString = JsonConvert.SerializeObject(basket);
                            await _cache.SetStringAsync(basket.BuyerUsername, newBasketString);

                            return true;
                        }

                    }


                    restaurant.FoodOrder.Add(orderedItem.orderedItem);
                    newBasketString = JsonConvert.SerializeObject(basket);
                    await _cache.SetStringAsync(basket.BuyerUsername, newBasketString);

                    return true;

                }
            }

            var newItem = new OrderCartItem(orderedItem.restaurantName,orderedItem.restaurantId);
            newItem.FoodOrder.Add(orderedItem.orderedItem);
            basket.OrderItems.Add(newItem);
            newBasketString = JsonConvert.SerializeObject(basket);
            await _cache.SetStringAsync(basket.BuyerUsername, newBasketString);
            return true;

        }
        
        public async Task<bool> DeleteBasket(string username)
        {
            var basketString = await _cache.GetStringAsync(username);
            if (string.IsNullOrEmpty(basketString))
            {
                return false;    
            }
            var basket =  JsonConvert.DeserializeObject<OrderCart>(basketString);
            if (basket is null)
            {
                return false;    
            }

            basket.OrderItems = new List<OrderCartItem>();
            
            var emptyBasket = JsonConvert.SerializeObject(basket);
            await _cache.SetStringAsync(basket.BuyerUsername, emptyBasket);
            
            return true;
        }

        public async Task<bool> DeleteCartItem(BasketItemDTO orderedItem)
        {
            var basketString = await _cache.GetStringAsync(orderedItem.buyerUsername);
            var basket = JsonConvert.DeserializeObject<OrderCart>(basketString);
            var errDish = basket.OrderItems
                .Find((rest) => rest.RestaurantId == orderedItem.restaurantId)
                .FoodOrder
                .Find((e)=>e.DishId==orderedItem.orderedItem.DishId);
            var res = basket.OrderItems.Find((rest) => rest.RestaurantId == orderedItem.restaurantId)
                .FoodOrder.Remove(errDish);
            if (res)
            {
                var restaur = basket.OrderItems.Find((rest) => rest.RestaurantId == orderedItem.restaurantId);
                if (restaur.FoodOrder.Count==0)
                {
                    basket.OrderItems.Remove(restaur);
                }
                var newBasketString = JsonConvert.SerializeObject(basket);
                await _cache.SetStringAsync(basket.BuyerUsername, newBasketString);
            }

            return res;
        }
        
    }
}
