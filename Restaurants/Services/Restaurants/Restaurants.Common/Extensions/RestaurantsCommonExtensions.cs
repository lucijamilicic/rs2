using Microsoft.Extensions.DependencyInjection;
using Restaurants.Common.Data;
using Restaurants.Common.DTOs;
using Restaurants.Common.Entities;
using Restaurants.Common.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Restaurants.Common.Extensions
{
    public static class RestaurantsCommonExtensions
    {
        // usage: services.AddRestaurantsCommonServices
        public static void AddRestaurantsCommonServices(this IServiceCollection services)
        {
            services.AddScoped<IRestaurantContext, RestaurantContext>();
            services.AddScoped<IRestaurantRepository, RestaurantRepository>();
            services.AddAutoMapper(configuration =>
            {
                configuration.CreateMap<RestaurantDTO, Restaurant>().ReverseMap();
                configuration.CreateMap<MenuItemDTO, MenuItem>().ReverseMap();

            });
        }
    }
}
