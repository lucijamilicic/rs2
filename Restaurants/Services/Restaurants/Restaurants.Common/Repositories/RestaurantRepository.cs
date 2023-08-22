using AutoMapper;
using Dapper;
using Restaurants.Common.Data;
using Restaurants.Common.DTOs;
using Restaurants.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurants.Common.Repositories
{
    internal class RestaurantRepository : IRestaurantRepository
    {
        private readonly IRestaurantContext _context;
        private readonly IMapper _mapper;

        public RestaurantRepository(IRestaurantContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public Task<bool> CreateRestaurant(CreateRestaurantDTO restaurantDTO)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteRestaurant(string restaurantName)
        {
            throw new NotImplementedException();
        }

        public async Task<RestaurantDTO> GetRestaurant(string restaurantName)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateRestaurant(RestaurantDTO restaurantDTO)
        {
            throw new NotImplementedException();
        }
    }
}
