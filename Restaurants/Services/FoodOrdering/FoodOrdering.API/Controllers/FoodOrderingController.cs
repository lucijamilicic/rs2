using System.Diagnostics;
using FoodOrdering.Application.Common;
using FoodOrdering.Application.Persistance;
using FoodOrdering.Domain.Aggregates;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace FoodOrdering.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FoodOrderingController:ControllerBase
    {
        private readonly IOrderRepository _repository;
        //private readonly ILogger _logger;
        //grpc ili rabbitmq

        public FoodOrderingController(IOrderRepository repository/*, ILogger logger*/)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            //_logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        //TODO: dodaj logove

        
        //TODO: cim se korisnik uloguje njegova putanja ce biti ova ispod, i automatski se poziva ova funkcija za dohvatanje ordera
        //TODO: mozda treba dodati u putanju npr. {username}/order
        
        [HttpGet( "{username}")]
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
        
        //TODO: mozda menjati putanju
        [HttpGet("{username}/checkout")]
        [ProducesResponseType(typeof(IEnumerable<OrderDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void),StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<OrderDTO>> CheckoutOrder(string username)
        {
            var result = await _repository.CheckoutOrdersByUsername(username);
            if (result != null) return Ok(result);
            
            //TODO: window - there is nothing to checkout, order is empty
            Debug.Write("No orders at the moment");
            //return warning?
            return NotFound();

        }

        [HttpPut("{username}/delete")]
        [ProducesResponseType(typeof(bool),StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void),StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteOrder(string username)
        {
            if(await _repository.DeleteOrder(username))
            {
                return Ok();
            }

            return NotFound();
        }

    }    
}

