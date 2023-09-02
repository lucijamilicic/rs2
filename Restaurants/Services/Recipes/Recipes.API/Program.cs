using Recipes.API.Data;
using Recipes.API.Entities;
using Recipes.API.GrpcServices;
using Recipes.API.Repositories;
using Restaurants.GRPC.Protos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<IRecipesContext, RecipesContext>();
builder.Services.AddScoped<IRecipesRepository, RecipesRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// gRPC
builder.Services.AddGrpcClient<RestaurantsProtoService.RestaurantsProtoServiceClient>(
    options => options.Address = new Uri(builder.Configuration["GrpcSettings:RestaurantsUrl"]));
builder.Services.AddScoped<RestaurantsGrpcService>();

builder.Services.AddAutoMapper(configuration =>
{
    configuration.CreateMap<RestaurantInfo, GetRestaurantsByMealResponse>().ReverseMap();
    configuration.CreateMap<RestaurantInfo, GetRestaurantsByMealResponse.Types.Restaurant>().ReverseMap();
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

// app.UseAuthorization();

app.MapControllers();

app.Run();