using FoodOrdering.Application.Persistance;
using FoodOrdering.Domain.Aggregates;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace FoodOrdering.Infrastructure.Repositories;

public class OrderRepository:IOrderRepository
{
    private readonly IDistributedCache _cache;
    //gRPCConnection

    public OrderRepository(IDistributedCache cache)
    {
        _cache = cache ?? throw new ArgumentNullException(nameof(cache));
    }

    //TODO: proveriti povratni tip
    public async Task<IReadOnlyList<Orders>?> GetOrdersAsync(string username)
    {
        //var order = await _cache.GetStringAsync(username);
        //return JsonConvert.DeserializeObject<IReadOnlyList<Orders>>(order);
        //TODO: treba da se kontaktira gRPC da bi se dohvatili podaci i smestili u kes (key da bude username)
        
        return null;
    }

    public async Task<IReadOnlyCollection<Orders>?> GetOrdersByUsername(string username)
    {
        var order = await _cache.GetStringAsync(username);
        if (String.IsNullOrEmpty(order))
        {
            return null;
        }

        return JsonConvert.DeserializeObject<IReadOnlyCollection<Orders>>(order);
    }

    public async Task DeleteOrder(int orderId)
    {
        await _cache.RemoveAsync(orderId.ToString());
    }
}