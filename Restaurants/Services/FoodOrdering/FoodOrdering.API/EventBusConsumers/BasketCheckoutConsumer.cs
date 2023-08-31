using System.Diagnostics;
using AutoMapper;
using EventBus.Messages.Events;
using FoodOrdering.Application.Common;
using FoodOrdering.Application.Persistance;
using MassTransit;
using Newtonsoft.Json;

namespace FoodOrdering.API.EventBusConsumers;

public class BasketCheckoutConsumer:IConsumer<BasketCheckoutEvent>
{
    private readonly IOrderRepository _repository;
    private readonly IMapper _mapper;


    public BasketCheckoutConsumer(IOrderRepository repository, IMapper mapper)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task Consume(ConsumeContext<BasketCheckoutEvent> context)
    {
        var res = _mapper.Map<OrderDTO>(context.Message);
        
        await _repository.CreateOrder(res);
    }
}