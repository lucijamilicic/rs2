namespace Basket.API.Enitities.Repositories
{
    public interface IRedisBasketRepository
    {
        Task<OrderCart?> GetBasket(string username);
        Task<OrderCart> UpdateBasket(OrderCart basket);


    }
}
