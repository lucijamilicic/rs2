namespace Basket.API.Enitities.Repositories
{
    public interface IRedisBasketRepository
    {
        Task<OrderCart?> GetBasket(string username);
        Task<bool> UpdateBasket(BasketItemDTO orderedItem);
        Task<bool> DeleteBasket(string username);
        Task<bool> DeleteCartItem(BasketItemDTO orderedItem);
        Task<bool> CreateBasket(OrderCart basket);

    }
}
