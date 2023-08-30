using AutoMapper;
using EventBus.Messages.Events;
using FoodOrdering.Application.Common;
using FoodOrdering.Domain.Entities;

namespace FoodOrdering.API.Mapper;

public class EmailProfile:Profile
{
    public EmailProfile()
    {
        CreateMap<OrderItemDTO,EmailSendingEvent>().ReverseMap();
        CreateMap<FoodItem, EventBus.Messages.Entities.FoodItem>().ReverseMap();
    }
}