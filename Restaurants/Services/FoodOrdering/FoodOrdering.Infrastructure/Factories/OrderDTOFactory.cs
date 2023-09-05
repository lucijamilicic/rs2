using FoodOrdering.Application.Common;
using FoodOrdering.Application.Factories;
using FoodOrdering.Domain.Aggregates;
using FoodOrdering.Domain.Entities;

namespace FoodOrdering.Infrastructure.Factories;

public class OrderDTOFactory:IOrderDTOFactory
{
    public OrderDTO CreateOrdersDTO(Orders orders)
    {
        var orderDTO = new OrderDTO();
        orderDTO.BuyerUsername = orders.BuyerName;
        orderDTO.BuyerEmailAddress = orders.BuyerEmailAddress;
        orderDTO.DeliveryAddress = orders.BuyerAddress;
        var orderItemsDTOList = new List<OrderItemDTO>();
        var total = 0M;
        foreach (var item in orders.ListOfOrders)
        {
            var orderItemDTO = new OrderItemDTO();
            orderItemDTO.RestaurantName = item.RestaurantName;
            var foodItemsList = new List<FoodItemDTO>();
            var totalSub = 0M;
            foreach (var foodItem in item.FoodOrder)
            {
                var foodDTO = new FoodItemDTO();
                foodDTO.DishName = foodItem.FoodName;
                totalSub += foodItem.Units * foodItem.Price;
                foodDTO.Price = foodItem.Price;
                foodDTO.Quantity = foodItem.Units;
                foodItemsList.Add(foodDTO);
            }
            total += totalSub;
            orderItemDTO.TotalPrice = totalSub;
            orderItemDTO.FoodOrder = foodItemsList; 
            orderItemsDTOList.Add(orderItemDTO);
        }

        orderDTO.TotalPrice = total;
        orderDTO.OrderItems = orderItemsDTOList;
        return orderDTO;
    }
}