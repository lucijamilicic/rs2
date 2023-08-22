using FoodOrdering.Domain.Aggregates;

namespace FoodOrdering.Application.Persistance;

public interface IOrderRepository
{
    Task<IReadOnlyList<Orders>?> GetOrdersAsync(string username);
    Task<IReadOnlyCollection<Orders>?> GetOrdersByUsername(string username);
    Task DeleteOrder(int orderId);
}