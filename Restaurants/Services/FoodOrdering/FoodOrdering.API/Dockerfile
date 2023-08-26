FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Services/FoodOrdering/FoodOrdering.API/FoodOrdering.API.csproj", "Services/FoodOrdering/FoodOrdering.API/"]
COPY ["Services/FoodOrdering/FoodOrdering.Application/FoodOrdering.Application.csproj", "Services/FoodOrdering/FoodOrdering.Application/"]
COPY ["Services/FoodOrdering/FoodOrdering.Domain/FoodOrdering.Domain.csproj", "Services/FoodOrdering/FoodOrdering.Domain/"]
COPY ["Services/FoodOrdering/FoodOrdering.Infrastructure/FoodOrdering.Infrastructure.csproj", "Services/FoodOrdering/FoodOrdering.Infrastructure/"]
COPY ["Common/EventBus.Messages/EventBus.Messages.csproj", "Common/EventBus.Messages/"]
RUN dotnet restore "Services/FoodOrdering/FoodOrdering.API/FoodOrdering.API.csproj"
COPY . .
WORKDIR "/src/Services/FoodOrdering/FoodOrdering.API"
RUN dotnet build "FoodOrdering.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FoodOrdering.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FoodOrdering.API.dll"]
