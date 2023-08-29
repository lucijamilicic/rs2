using System.Diagnostics;
using System.Security.Claims;
using AutoMapper;
using EventBus.Messages.Events;
using FoodOrdering.Application.Common;
using FoodOrdering.Application.Persistance;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrdering.API.Controllers
{
    
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FoodOrderingController:ControllerBase
    {
        private readonly IOrderRepository _repository;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        
        
        //TODO: mozda menjati putanju
        public FoodOrderingController(IOrderRepository repository, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _publishEndpoint = publishEndpoint ?? throw new ArgumentNullException(nameof(publishEndpoint));
        }

        [HttpPost("checkout")]
        [ProducesResponseType(typeof(OrderDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void),StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<OrderDTO>> CheckoutOrder(string username)
        {
           /* if (User.FindFirst(ClaimTypes.Name)?.Value != username)
            {
                return Forbid();
            }*/
            var result = await _repository.CheckoutOrdersByUsername(username);
            Console.WriteLine("*************"+result);

            if(result!=null)
            {
                foreach (var restaurant in result.OrderItems)
                {
                    var eventMessage = _mapper.Map<EmailSendingEvent>(restaurant);
                    await _publishEndpoint.Publish(eventMessage);
                }
                await _repository.DeleteOrder(username);
                return Ok(result);
            }
            return BadRequest();

        }
        
        //TODO: cim se korisnik uloguje njegova putanja ce biti ova ispod, i automatski se poziva ova funkcija za dohvatanje ordera
        //TODO: mozda treba dodati u putanju npr. {username}/order
        /*
        [HttpGet( "{username}/get")]
        [ProducesResponseType(typeof(IEnumerable<OrderDTO>),StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void),StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<OrderDTO>> GetOrdersByUsername(string username)
        {
            var result = await _repository.GetOrdersAsync(username);
            if (result == null)
            {
                return NotFound();

            }
            return Ok(result);
        }
        */

    }    
}

