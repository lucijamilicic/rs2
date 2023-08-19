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

        public async Task<OrderCart> GetBasket(string username)
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
            await _cache.SetStringAsync(basket.Username, basketString);

            //vracamo iz baze ono sto smo dohvatili (bolja praksa nego da prosledjujemo direktno ono sto smo prosledili)
            return await GetBasket(basket.Username);

        }
        public async Task DeleteBasket(string username)
        {
            await _cache.RemoveAsync(username);
        }
    }
}
