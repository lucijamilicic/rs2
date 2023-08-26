using AutoMapper;
using Basket.API.Enitities;
using Basket.API.Enitities.Repositories;
using EventBus.Messages.Events;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Basket.API.Controllers
{
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
            var basket = await _repository.GetBasket(username); 
            return Ok(basket ?? new OrderCart(username));
        }

        [HttpPut]
        [ProducesResponseType(typeof(OrderCart), StatusCodes.Status200OK)]
        public async Task<ActionResult<OrderCart>> UpdateBasket([FromBody]OrderCart basket)
        {
            return Ok(await _repository.UpdateBasket(basket));


        }

        [HttpDelete("{username}")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteBasket(string username)
        {
            await _repository.DeleteBasket(username);
            return Ok();
        }

        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType(typeof(BasketCheckoutEvent), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BasketCheckoutEvent>?> Checkout(string username/*[FromBody] BasketCheckout basketCheckout*/)
        {
            //get exiating basket
            var basket = await _repository.GetBasket(username);
            if (basket is null)
            {
                return BadRequest();
            }
            //send checkout event
            var eventMessage = _mapper.Map<BasketCheckoutEvent>(basket);
            await _publishEndpoint.Publish(eventMessage);
            
            //remove the basket
            await _repository.DeleteBasket(username);
            
            return Ok(eventMessage);
        }
    }
}
