using AutoMapper;
using Grpc.Core;
using Restaurants.Common.Repositories;
using Restaurants.GRPC.Protos;

namespace Restaurants.GRPC.Services
{
    public class RestaurantsService : RestaurantsProtoService.RestaurantsProtoServiceBase
    {
        private readonly IRestaurantRepository _repository;
        private readonly ILogger<RestaurantsService> _logger;
        private readonly IMapper _mapper;

        public RestaurantsService(IRestaurantRepository repository, ILogger<RestaurantsService> logger, IMapper mapper)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public override async Task<GetRestaurantsByMealResponse> GetRestaurantsByMeal(GetRestaurantsByMealRequest request, ServerCallContext context)
        {
            var restaurants = await _repository.GetRestaurantsByMeal(request.Id);

            var response = new GetRestaurantsByMealResponse();
            response.Restaurants.AddRange(_mapper.Map<IEnumerable<GetRestaurantsByMealResponse.Types.Restaurant>>(restaurants));

            _logger.LogInformation("Restaurants for {id}", request.Id);

            return response;
        }
    }
}
