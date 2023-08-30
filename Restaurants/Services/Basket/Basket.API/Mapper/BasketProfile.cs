using AutoMapper;
using Basket.API.Enitities;
using EventBus.Messages.Entities;
using EventBus.Messages.Events;

namespace Basket.API.Mapper;

public class BasketProfile:Profile
{
    public BasketProfile()
    {
        CreateMap<OrderCart, BasketCheckoutEvent>().ReverseMap();
        CreateMap<OrderCartItem, BasketItem>().ReverseMap();
        CreateMap<Dish,FoodItem>().ReverseMap();
    }
}