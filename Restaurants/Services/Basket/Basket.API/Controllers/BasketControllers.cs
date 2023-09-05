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
            return Ok(basket );
        }

        [HttpPut]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(bool), StatusCodes.Status400BadRequest)]
        
        public async Task<ActionResult<bool>> UpdateBasket([FromBody] BasketItemDTO basket)
        {
            
            if (User.FindFirstValue(ClaimTypes.Name) != basket.buyerUsername)
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
            var res = _repository.CreateBasket(basketCheckout);
            
            //if basket doesn't exist or it is empty
            if (basketCheckout is null || basketCheckout.OrderItems is null)
            {
                return BadRequest();
            }
            
            //send checkout event
            var eventMessage = _mapper.Map<BasketCheckoutEvent>(basketCheckout);
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
        
        [HttpDelete("/orderItem")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(bool), StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> DeleteBasketItem([FromBody] BasketItemDTO basketItemDTO)
        {
            
            if (User.FindFirstValue(ClaimTypes.Name) != basketItemDTO.buyerUsername)
            {
                return Forbid();
            }
            
            var res = await _repository.DeleteCartItem(basketItemDTO);
            return res ? Ok(res) : BadRequest(res);
        }

       
    }
}
