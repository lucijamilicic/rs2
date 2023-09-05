using FoodOrdering.Application.Common;

namespace FoodOrdering.Application.Persistance;

public interface IOrderRepository
{
    public Task CreateOrder(OrderDTO orderDTO);
    //Task<OrderDTO?> GetOrdersAsync(string username);
    Task<OrderDTO?> CheckoutOrdersByUsername(string username);
    Task DeleteOrder(string username);
}