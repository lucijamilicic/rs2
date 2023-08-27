using System.Diagnostics;
using FoodOrdering.Application.Common;
using FoodOrdering.Application.EmailModels;
using FoodOrdering.Application.Factories;
using FoodOrdering.Application.Persistance;
using FoodOrdering.Domain.Aggregates;
using FoodOrdering.Domain.Entities;
using FoodOrdering.Domain.ValueObjects;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace FoodOrdering.Infrastructure.Repositories;

public class OrderRepository:IOrderRepository
{
    private readonly IEmailService _emailService;
    private readonly IDistributedCache _cache;
    private readonly IOrderDTOFactory _factoryDTO;
    private readonly IOrderFactory _factory;

    //asinhrona komunikacija


    public OrderRepository(IEmailService emailService, IDistributedCache cache, IOrderDTOFactory factoryDto,
        IOrderFactory factory)
    {
        _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        _cache = cache ?? throw new ArgumentNullException(nameof(cache));
        _factoryDTO = factoryDto ?? throw new ArgumentNullException(nameof(factoryDto));
        _factory = factory ?? throw new ArgumentNullException(nameof(factory));
    }

    public async Task<int> CreateOrder(OrderDTO orderDTO)
    {
        var order = _factory.CreateOrder(orderDTO);
        
        var orderString = JsonConvert.SerializeObject(order);
        await _cache.SetStringAsync(order.BuyerName, orderString);
        Console.WriteLine("---------------- USO: "+order.BuyerName);
        return int.Parse(order.Id);

    }
    /*
    public async Task<OrderDTO?> GetOrdersAsync(string username)
    {
        //TODO: treba da se kontaktira basket (asinhrina komunikacija) da bi se dohvatili podaci i smestili u kes (key da bude username)
        var orderString = await _cache.GetStringAsync(username);
        if (string.IsNullOrEmpty(orderString))
        {
            return null;
        }

        return JsonConvert.DeserializeObject<OrderDTO>(orderString);
    }
*/
    public async Task<OrderDTO?> CheckoutOrdersByUsername(string username)
    {
        var orderString = await _cache.GetStringAsync(username);
        if (String.IsNullOrEmpty(orderString))
        {
            //TODO:the order is empty, nothing to checkout - show window message
            return null;
        }
        var orders = JsonConvert.DeserializeObject<Orders>(orderString);

        var email = new Application.EmailModels.Email();
        email.To = orders.BuyerAddress.EmailAddress;
        email.Subject = "Order from MATFraurant App";
        var bodyStr = "Order is successfully created on RestaurantApp\n\n";
        bodyStr += orderString;
        email.Body = bodyStr;
        
        await _emailService.SendEmail(email); //salje mejl korisniku

        return _factoryDTO.CreateOrdersDTO(orders);

    }

    //TODO:check what he do if username doesnt exist in cash
    public async Task<bool> DeleteOrder(string username)
    {
        var order = await _cache.GetStringAsync(username);
        if (String.IsNullOrEmpty(order))
        {
            //TODO:the order is empty, nothing to checkout - show window message
            return false;
        }
        var orders = JsonConvert.DeserializeObject<Orders>(order);

        await _cache.RemoveAsync(username);

        //TODO: mozda ni ne mora ovde da se salje mejl
        var email = new Application.EmailModels.Email();
        email.To = orders.BuyerAddress.EmailAddress;
        email.Subject = "Order from MATFraurant App";
        email.Body = " Order for user "+username+" is successfully deleted";
        await _emailService.SendEmail(email);

        return true;
    }

}