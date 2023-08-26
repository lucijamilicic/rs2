using System.Reflection;
using MassTransit;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddStackExchangeRedisCache(
    opts => {
        opts.Configuration = builder.Configuration.GetValue<string>("CacheSettings:ConnectionString");
    });
builder.Services.AddScoped<Basket.API.Enitities.Repositories.IRedisBasketRepository, Basket.API.Enitities.Repositories.RedisBasketRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Automapper
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

//EventBus
builder.Services.AddMassTransit(config =>
{
    config.UsingRabbitMq((ctx, cfg) =>
    {
        cfg.Host(builder.Configuration["EventBusSettings:HostAddress"]);
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
