using System.Collections.Generic;
using System.Globalization;
using FoodOrdering.Domain.Common;
using FoodOrdering.Domain.Exceptions;
using FoodOrdering.Domain.ValueObjects;

namespace FoodOrdering.Domain.Entities
{
    public class OrderItem //: EntityBase
    {
        public OrderItem(string restaurantName, Address restaurantAddress, List<FoodItem> foodOrders)
        {
            RestaurantName = restaurantName;
            RestaurantAddress = restaurantAddress;
            FoodOrder = foodOrders  ?? new List<FoodItem>();;
        }

        public string RestaurantName { get; private set; }
        public Address RestaurantAddress { get; private set; }
        public List<FoodItem> FoodOrder { get; private set; }
    }
    
}