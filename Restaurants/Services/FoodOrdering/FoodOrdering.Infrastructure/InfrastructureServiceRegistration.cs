using FoodOrdering.Application.EmailModels;
using FoodOrdering.Application.Factories;
using FoodOrdering.Application.Persistance;
using FoodOrdering.Infrastructure.Email;
using FoodOrdering.Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FoodOrdering.Infrastructure;

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddScoped<IOrderRepository, OrderRepository>();

        services.AddScoped<IOrderFactory, IOrderFactory>();

        services.Configure<EmailSettings>(c =>
        {
            var config = configuration.GetSection("EmailSettings");
            c.Mail = config["Mail"];
            c.DisplayName = config["DisplayName"];
            c.Password = config["Password"];
            c.Host = config["Host"];
            c.Port = int.Parse(config["Port"]);
        });
        services.AddTransient<IEmailService, EmailService>();
        
        return services;
    }

}