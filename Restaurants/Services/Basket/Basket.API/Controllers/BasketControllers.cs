using AutoMapper;
using Basket.API.Enitities;
using Basket.API.Enitities.Repositories;
using EventBus.Messages.Events;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Basket.API.Controllers
{
    [Authorize(Roles = "Buyer")]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class BasketControllers : ControllerBase
    {
        private readonly IRedisBasketRepository _repository;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;
        private readonly ILogger<BasketControllers> _logger;


        public BasketControllers(IRedisBasketRepository repository, IMapper mapper, IPublishEndpoint publishEndpoint,
            ILogger<BasketControllers> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _publishEndpoint = publishEndpoint ?? throw new ArgumentNullException(nameof(publishEndpoint));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet("{username}")]
        [ProducesResponseType(typeof(OrderCart), StatusCodes.Status200OK)]
        public async Task<ActionResult<OrderCart>> GetBasket(string username)
        {
            
            if (User.FindFirst(ClaimTypes.Name)?.Value != username)
            {
                return Forbid();
            }
            
            var basket = await _repository.GetBasket(username); 
            return Ok(basket ?? new OrderCart(username));
        }

        [HttpPut]
        [ProducesResponseType(typeof(OrderCart), StatusCodes.Status200OK)]
        public async Task<ActionResult<OrderCart>> UpdateBasket([FromBody]OrderCart basket)
        {
            
            if (User.FindFirstValue(ClaimTypes.Name) != basket.BuyerUsername)
            {
                return Forbid();
            }
            
            return Ok(await _repository.UpdateBasket(basket));
        }

        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType(typeof(BasketCheckoutEvent), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BasketCheckoutEvent>?> Checkout([FromBody] OrderCart  basketCheckout)
        {
            
            if (User.FindFirstValue(ClaimTypes.Name) != basketCheckout.BuyerUsername)
            {
                return Forbid();
            }

            //get existing basket
            var basket = await _repository.GetBasket(basketCheckout.BuyerUsername);
            //if basket doesnt exist or it is empty
            if (basket is null || basket.OrderItems is null)
            {
                return BadRequest();
            }
            
            //send checkout event
            var eventMessage = _mapper.Map<BasketCheckoutEvent>(basket);
            await _publishEndpoint.Publish(eventMessage);
            
            return Ok(eventMessage);
        }
        
        [HttpDelete("{username}")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteBasket(string username)
        {
            
            if (User.FindFirstValue(ClaimTypes.Name) != username)
            {
                return Forbid();
            }
        
            var res = await _repository.DeleteBasket(username);
            if (res)
                return Ok();
            
            return BadRequest();
        }

        
    }
}
