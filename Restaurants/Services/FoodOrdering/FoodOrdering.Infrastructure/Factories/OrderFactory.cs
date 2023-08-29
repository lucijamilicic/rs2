using FoodOrdering.Application.Common;
using FoodOrdering.Application.Factories;
using FoodOrdering.Domain.Aggregates;
using FoodOrdering.Domain.Entities;
using FoodOrdering.Domain.ValueObjects;

namespace FoodOrdering.Infrastructure.Factories;

public class OrderFactory:IOrderFactory
{
    public Orders CreateOrder(OrderDTO orderDTO)
    {
        var order = new Orders(orderDTO.CreationDate, orderDTO.Id.ToString(), orderDTO.BuyerId, orderDTO.BuyerUsername,
            new Address(orderDTO.Street, orderDTO.City, orderDTO.Country, orderDTO.ZipCode, orderDTO.EmailAddress),new List<OrderItem>());
        foreach (var item in orderDTO.OrderItems)
        {
            var orderItem = new OrderItem(item.RestaurantName,
                new Address(item.Street, item.City, item.Country, item.ZipCode, "item.EmailAddress"),new List<FoodItem>());
            foreach (var fooditem in item.FoodOrder)
            {
                var food = new FoodItem(fooditem.DishName,fooditem.ExtraNote,fooditem.Price,fooditem.Quantity);
                orderItem.FoodOrder.Add(food);
            }
            order.ListOfOrders.Add(orderItem);
        }

        return order;
    }
}