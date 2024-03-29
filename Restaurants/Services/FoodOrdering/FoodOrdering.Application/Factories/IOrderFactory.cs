using FoodOrdering.Application.Common;
using FoodOrdering.Domain.Aggregates;

namespace FoodOrdering.Application.Factories;

public interface IOrderFactory
{
    Orders CreateOrder(OrderDTO orderDTO);

}