using System;
using System.Collections.Generic;
using FoodOrdering.Domain.Common;
using FoodOrdering.Domain.Entities;
using FoodOrdering.Domain.ValueObjects;

namespace FoodOrdering.Domain.Aggregates
{
    public class Orders:AggregateRoot
    {
        public Orders(string buyerId, Address buyerAddress)
        {
            BuyerId = buyerId;
            BuyerAddress = buyerAddress;
            OrderDate = DateTime.Now;
        }

        public DateTime OrderDate { get; private set; }
        public string BuyerId { get; private set; }
        public Address BuyerAddress  { get; private set; }
        private readonly List<OrderItem> _listOfOrders = new List<OrderItem>();
        public IReadOnlyCollection<OrderItem> ListOfOrders => _listOfOrders;
        
        public Orders(int id, string buyerId, Address address)
            : this(buyerId, address)
        {
            Id = id;
        }
        
        public Orders(int id)
        {
            Id = id;
        }

    }
}