using FoodOrdering.Application.Common;
using FoodOrdering.Application.Persistance;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrdering.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FoodOrderingController:ControllerBase
    {
        private readonly IOrderRepository repository;
        private readonly ILogger logger;
        //grpc ili rabbitmq

        public FoodOrderingController(IOrderRepository repository, ILogger logger)
        {
            this.repository = repository ?? throw new ArgumentNullException(nameof(repository));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        //TODO: dodaj logove

        [HttpGet( "{username}")]
        [ProducesResponseType(typeof(IEnumerable<OrderDTO>),StatusCodes.Status200OK)]
        public async Task<ActionResult<OrderDTO>> GetOrdersByUsername(string username)
        {
            var result = await this.repository.GetOrdersAsync(username);
            return Ok(result);
        }
        
        [HttpPost]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<ActionResult<int>> CheckoutOrder(OrderDTO orderDTO)
        {
            var result = await this.repository.GetOrdersByUsername(orderDTO.BuyerUsername);
            if (result == null)
            {
                //return warning?
            }

            //TODO: send mail
            //posle ovoga bi trebalo obrisati order
            //
            return Ok();
        }

        [Route("delete")]
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteOrder(OrderDTO orderDTO)
        {
            await this.repository.DeleteOrder(orderDTO.Id);
            //TODO:send mail
            return Ok();
        }


    }    
}

