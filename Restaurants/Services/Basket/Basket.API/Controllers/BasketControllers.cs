using Basket.API.Enitities;
using Basket.API.Enitities.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Basket.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class BasketControllers : ControllerBase
    {
        private readonly IRedisBasketRepository _repository;

        public BasketControllers(IRedisBasketRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
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
    }
}
