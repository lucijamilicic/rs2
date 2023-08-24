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
    private readonly IOrderDTOFactory _factory;

    //asinhrona komunikacija
    
    public OrderRepository(IEmailService emailService, IDistributedCache cache,IOrderDTOFactory factory)
    {
        _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        _cache = cache ?? throw new ArgumentNullException(nameof(cache));
        _factory = factory ?? throw new ArgumentNullException(nameof(factory));
    }

    public async Task<OrderDTO?> GetOrdersAsync(string username)
    {
        //TODO: treba da se kontaktira basket (asinhrina komunikacija) da bi se dohvatili podaci i smestili u kes (key da bude username)

        //hardcodovani podaci , zbog testiranja   -----------------------------
        var address = new Address("Tobijeva 5","Beograd","Srbija","11000","pesic466@gmail.com");
        var foodOrder = new FoodItem("carebonara","bez krastavcica",  150M,1);
        var foodList = new List<FoodItem>();
        foodList.Add(foodOrder);
        var orderItems = new OrderItem("KFC",address,foodList);
        var orderList = new List<OrderItem>();
        orderList.Add(orderItems);
        var order = new Orders(DateTime.Now,"1","Tobi",address, orderList);
        //--------------------------------------------------------------------------
        
        var orderString = JsonConvert.SerializeObject(order);
        await _cache.SetStringAsync("Tobi", orderString);
        var orders = JsonConvert.DeserializeObject<Orders>(orderString);
        if (orders is null)
        {
            return null;
        }

        return _factory.CreateOrdersDTO(orders);
    }

    public async Task<OrderDTO?> CheckoutOrdersByUsername(string username)
    {
        var order = await _cache.GetStringAsync(username);
        if (String.IsNullOrEmpty(order))
        {
            //TODO:the order is empty, nothing to checkout - show window message
            return null;
        }
        var orders = JsonConvert.DeserializeObject<Orders>(order);

        var email = new Application.EmailModels.Email();
        email.To = orders.BuyerAddress.EmailAddress;
        email.Subject = "Order from MATFraurant App";
        var bodyStr = "Order is successfully created on RestaurantApp\n\n";
        bodyStr += order;
        email.Body = bodyStr;
        
        await _emailService.SendEmail(email);

        return _factory.CreateOrdersDTO(orders);

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