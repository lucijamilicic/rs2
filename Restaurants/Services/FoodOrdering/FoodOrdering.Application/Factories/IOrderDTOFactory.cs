using FoodOrdering.Application.Common;
using FoodOrdering.Domain.Aggregates;

namespace FoodOrdering.Application.Factories;

public interface IOrderDTOFactory
{
    OrderDTO CreateOrdersDTO(Orders orders);
}