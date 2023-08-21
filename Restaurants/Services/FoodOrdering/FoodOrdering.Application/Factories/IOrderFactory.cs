using FoodOrdering.Application.Common;
using FoodOrdering.Domain.Aggregates;
    
namespace FoodOrdering.Application.Factories;

public class IOrderFactory
{
    Orders Create(CreateOrderDTO order);

}