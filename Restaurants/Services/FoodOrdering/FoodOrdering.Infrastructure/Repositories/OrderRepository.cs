using System.Diagnostics;
using System.Text;
using AutoMapper;
using FoodOrdering.Application.Common;
using FoodOrdering.Application.EmailModels;
using FoodOrdering.Application.Factories;
using FoodOrdering.Application.Persistance;
using FoodOrdering.Domain.Aggregates;
using FoodOrdering.Domain.Entities;
using FoodOrdering.Domain.ValueObjects;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace FoodOrdering.Infrastructure.Repositories;

public class OrderRepository:IOrderRepository
{
    private readonly IEmailService _emailService;
    private readonly IDistributedCache _cache;
    private readonly IOrderDTOFactory _factoryDTO;
    private readonly IOrderFactory _factory;
    private readonly IMapper _mapper;

    public OrderRepository(IEmailService emailService, IDistributedCache cache, IOrderDTOFactory factoryDto,
        IOrderFactory factory, IMapper mapper)
    {
        _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        _cache = cache ?? throw new ArgumentNullException(nameof(cache));
        _factoryDTO = factoryDto ?? throw new ArgumentNullException(nameof(factoryDto));
        _factory = factory ?? throw new ArgumentNullException(nameof(factory));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<string> CreateOrder(OrderDTO orderDTO)
    {
        var order = _factory.CreateOrder(orderDTO);
        
        var orderString = JsonConvert.SerializeObject(order);
        
        await _cache.SetStringAsync(order.BuyerName, orderString);
        
        return order.Id;
    }
  
    public async Task<OrderDTO?> CheckoutOrdersByUsername(string username)
    {
        var orderString = await _cache.GetStringAsync(username);
        
        if (String.IsNullOrEmpty(orderString))
        {
             return null;
        }
        
        var orders =JsonConvert.DeserializeObject<Orders>(orderString);
        var orderDTO = _factoryDTO.CreateOrdersDTO(orders);
        
        await SendMail(orderDTO);
        
        return orderDTO;

    }

    public async Task SendMail(OrderDTO orderDTO) {
        var email = new Application.EmailModels.Email();
        
        email.To = orderDTO.EmailAddress;
        email.Subject = "Order from MATFraurant App";
        var bodyStr = $"Order for user {orderDTO.BuyerUsername} is successfully created.\n\n";
        bodyStr += "Thank you for using our service.\n Have a good day!";
        email.Body = bodyStr;

        await _emailService.SendEmail(email);
    }
    public async Task DeleteOrder(string username)
    {
        var order = await _cache.GetStringAsync(username);
        await _cache.RemoveAsync(username);
    }

}