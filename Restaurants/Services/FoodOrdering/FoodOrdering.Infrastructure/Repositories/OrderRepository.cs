using FoodOrdering.Application.Common;
using FoodOrdering.Application.EmailModels;
using FoodOrdering.Application.Factories;
using FoodOrdering.Application.Persistance;
using FoodOrdering.Domain.Aggregates;
using FoodOrdering.Domain.Entities;
using FoodOrdering.Domain.ValueObjects;
using FoodOrdering.Infrastructure.Factories;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace FoodOrdering.Infrastructure.Repositories;

public class OrderRepository:IOrderRepository
{
    private readonly IEmailService _emailService;
    private readonly IDistributedCache _cache;
    private readonly IOrderDTOFactory _factory;

    private Application.EmailModels.Email _email;

    private Orders? _localorder;
    //asinhrona komunikacija
    
    public OrderRepository(IEmailService emailService, IDistributedCache cache,IOrderDTOFactory factory)
    {
        _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        _cache = cache ?? throw new ArgumentNullException(nameof(cache));
        _factory = factory ?? throw new ArgumentNullException(nameof(factory));
        _email = new Application.EmailModels.Email(); //TODO:
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
        _localorder = order;
        //--------------------------------------------------------------------------
        
        var orderString = JsonConvert.SerializeObject(order);
        await _cache.SetStringAsync("Tobi", orderString);
        var orders = JsonConvert.DeserializeObject<Orders>(orderString);
        if (orders is null)
        {
            return null;
        }

        return _factory.CreateOrdersDTO(orders);
        //return _factory.CreateOrdersDTO(orders);

        //_email.To = order.Address.EmailAddress;
        //_email.Subject = "Order from MATFraurant App";
        ////return JsonConvert.DeserializeObject<IReadOnlyList<Orders>>(order);

    }

    public async Task<OrderDTO> CheckoutOrdersByUsername(string username)
    {
        //TODO: ovo bi trebalo biti ceo order?
        var order = await _cache.GetStringAsync(username);
        if (String.IsNullOrEmpty(order))
        {
            //TODO:the order is empty, nothing to checkout - show window message
            return null;
        }
        
/*
        if (_localorder != null)
        {

            _email.To = _localorder.BuyerAddress.EmailAddress;
            _email.Subject =_email.Subject = "Order from MATFraurant App";


            _email.Body = " Order is successfully created on RestaurantApp";
        }
        await _emailService.SendEmail(_email);
        */
        //TODO: obrisati order MOZDA
        var orders = JsonConvert.DeserializeObject<Orders>(order);
        return _factory.CreateOrdersDTO(orders);

    }

    //TODO:check what he do if username doesnt exist in cash
    public async Task<bool> DeleteOrder(string username)
    {
        string body = "Order for user with username "+username + " is deleted";
        //TODO:send mail
        /*
        if (_localorder != null)
        {
            _email.To = _localorder.BuyerAddress.EmailAddress;
            _email.Subject =_email.Subject = "Order from MATFraurant App";

            _email.Body = body;
            await _cache.RemoveAsync(username);
            await _emailService.SendEmail(_email);
            return true;
        }
        */
        await _cache.RemoveAsync(username);

        return true;
    }

}