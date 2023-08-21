using System.Collections.Generic;
using System.Globalization;
using FoodOrdering.Domain.Common;
using FoodOrdering.Domain.Exceptions;
using FoodOrdering.Domain.ValueObjects;

namespace FoodOrdering.Domain.Entities
{
    public class OrderItem : EntityBase
    {
        public OrderItem(string restaurantId, Address restaurantAddress, int units)
        {
            RestaurantId = restaurantId;
            RestaurantAddress = restaurantAddress;
            FoodOrder = new List<FoodItem>();
        }

        public string RestaurantId { get; private set; } //RestaurantName
        public Address RestaurantAddress { get; private set; }
        public List<FoodItem> FoodOrder { get; private set; }
    }
    
}