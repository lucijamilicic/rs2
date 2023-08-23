using FoodOrdering.Application.Common;
using FoodOrdering.Domain.Aggregates;

namespace FoodOrdering.Application.Persistance;

public interface IOrderRepository
{
    Task<OrderDTO?> GetOrdersAsync(string username);
    Task<OrderDTO?> CheckoutOrdersByUsername(string username);
    Task<bool> DeleteOrder(string username);

}