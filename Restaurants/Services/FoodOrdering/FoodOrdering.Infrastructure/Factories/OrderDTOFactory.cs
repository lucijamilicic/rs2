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
        orderDTO.City = orders.BuyerAddress.City;
        orderDTO.Country = orders.BuyerAddress.Country;
        orderDTO.Street = orders.BuyerAddress.Street;
        orderDTO.ZipCode = orders.BuyerAddress.ZipCode;
        orderDTO.EmailAddress = orders.BuyerAddress.EmailAddress;
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
                foodDTO.FoodName = foodItem.FoodName;
                totalSub += foodItem.Units * foodItem.Price;
                foodDTO.Price = foodItem.Price;
                foodDTO.Units = foodItem.Units;
                foodItemsList.Add(foodDTO);
            }
            total += totalSub;
            orderItemDTO.TotalPrice = totalSub;
            orderItemDTO.FoodItems = foodItemsList; 
            orderItemsDTOList.Add(orderItemDTO);
        }

        orderDTO.OrderItems = orderItemsDTOList;
        orderDTO.TotalPrice = total;
        return orderDTO;
    }
}