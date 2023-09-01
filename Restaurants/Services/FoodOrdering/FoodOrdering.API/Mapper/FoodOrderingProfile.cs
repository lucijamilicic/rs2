using AutoMapper;
using EventBus.Messages.Events;
using FoodOrdering.Application.Common;
using FoodOrdering.Domain.Aggregates;

namespace FoodOrdering.API.Mapper;

public class FoodOrderingProfile:Profile
{
    public FoodOrderingProfile()
    {        
        CreateMap<OrderDTO, BasketCheckoutEvent>().ReverseMap();
        CreateMap<OrderItemDTO, EventBus.Messages.Entities.BasketItem>().ReverseMap();
        CreateMap<FoodItemDTO, EventBus.Messages.Entities.FoodItem>().ReverseMap();
    }
}