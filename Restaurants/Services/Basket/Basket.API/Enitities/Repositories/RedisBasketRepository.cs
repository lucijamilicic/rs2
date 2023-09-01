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
            var basket =await _cache.GetStringAsync(username);
            if (string.IsNullOrEmpty(basket))
            {
                return null;    
                 
            }
            //deserializacija iz stringa u objekat
            return JsonConvert.DeserializeObject<OrderCart>(basket);

        }
        public async Task<OrderCart> UpdateBasket(OrderCart basket)
        {
            var basketString = JsonConvert.SerializeObject(basket);

            //kao argumente saljemo prvo kljuc-username i vrednosti-basketString
            await _cache.SetStringAsync(basket.BuyerUsername, basketString);

            //vracamo iz baze ono sto smo dohvatili (bolja praksa nego da prosledjujemo direktno ono sto smo prosledili)
            return await GetBasket(basket.BuyerUsername);

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
            basket.OrderItems = Enumerable.Empty<OrderCartItem>();
            
            var emptyBasket = JsonConvert.SerializeObject(basket);
            await _cache.SetStringAsync(basket.BuyerUsername, emptyBasket);
            
            return true;
        }

    }
}
