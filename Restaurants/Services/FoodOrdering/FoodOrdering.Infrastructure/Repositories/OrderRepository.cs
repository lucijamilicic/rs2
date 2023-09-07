using FoodOrdering.Application.Common;
using FoodOrdering.Application.EmailModels;
using FoodOrdering.Application.Persistance;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace FoodOrdering.Infrastructure.Repositories;

public class OrderRepository:IOrderRepository
{
    private readonly IEmailService _emailService;
    private readonly IDistributedCache _cache;

    public OrderRepository(IEmailService emailService, IDistributedCache cache)
    {
        _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        _cache = cache ?? throw new ArgumentNullException(nameof(cache));
    }

    public async Task CreateOrder(OrderDTO orderDTO)
    {
        var orderString = JsonConvert.SerializeObject(orderDTO);
        
        await _cache.SetStringAsync(orderDTO.BuyerUsername, orderString);
        
    }
  
    public async Task<OrderDTO?> CheckoutOrdersByUsername(string username)
    {
        var orderString = await _cache.GetStringAsync(username);
        
        if (String.IsNullOrEmpty(orderString))
        {
             return null;
        }
        
        var orders = JsonConvert.DeserializeObject<OrderDTO>(orderString);
        
        await SendMail(orders);
        
        return orders;

    }

    public async Task SendMail(OrderDTO orderDTO) {
        var email = new Application.EmailModels.Email();
        
        email.To = orderDTO.BuyerEmailAddress;
        email.Subject = "Order from MATFraurant App";
        var bodyStr = $"Dear {orderDTO.BuyerUsername},\n\n Your order is successfully created.\nTotal price for your purchase is {orderDTO.TotalPrice.ToString()} eur. \n\n";
        bodyStr += "Thank you for using our service.\n Have a good day!";
        email.Body = bodyStr;
        await _emailService.SendEmail(email);
    }
    public async Task DeleteOrder(string username)
    {
        var orderString = await _cache.GetStringAsync(username);
        var order = JsonConvert.DeserializeObject<OrderDTO>(orderString);
        order.OrderItems = new List<OrderItemDTO>();
        var newOrder = JsonConvert.SerializeObject(order);
        await _cache.SetStringAsync(username, newOrder);
    }

}