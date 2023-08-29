using Restaurants.GRPC.Protos;

namespace Recipes.API.GrpcServices
{
    public class RestaurantsGrpcService
    {
        private readonly RestaurantsProtoService.RestaurantsProtoServiceClient _restaurantsProtoServiceClient;

        public RestaurantsGrpcService(RestaurantsProtoService.RestaurantsProtoServiceClient restaurantsProtoServiceClient)
        {
            _restaurantsProtoServiceClient = restaurantsProtoServiceClient ?? throw new ArgumentNullException(nameof(restaurantsProtoServiceClient));

        }

        public async Task<GetRestaurantsByMealResponse> GetRestaurantsByMeal(string mealID)
        {
            var restaurantsRequest = new GetRestaurantsByMealRequest();
            restaurantsRequest.Id = mealID;

            return await _restaurantsProtoServiceClient.GetRestaurantsByMealAsync(restaurantsRequest);
        }
    }


}
