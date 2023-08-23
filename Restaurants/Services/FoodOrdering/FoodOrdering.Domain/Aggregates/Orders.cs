using System;
using System.Collections.Generic;
using FoodOrdering.Domain.Common;
using FoodOrdering.Domain.Entities;
using FoodOrdering.Domain.ValueObjects;

namespace FoodOrdering.Domain.Aggregates
{
    public class Orders:AggregateRoot
    {
        public Orders(DateTime orderDate, string buyerId, string buyerName, Address buyerAddress,List<OrderItem> listOfOrders)
        {
            OrderDate = orderDate;
            BuyerId = buyerId ?? throw new ArgumentNullException(nameof(buyerId));
            BuyerName = buyerName ?? throw new ArgumentNullException(nameof(buyerName));
            BuyerAddress = buyerAddress ?? throw new ArgumentNullException(nameof(buyerAddress));
            ListOfOrders = listOfOrders ?? new List<OrderItem>();
        }

        public DateTime OrderDate { get; private set; }
        public string BuyerId { get; private set; }
        public string BuyerName { get; private set; }
        public Address BuyerAddress  { get; private set; }
        public List<OrderItem> ListOfOrders { get; private set; }



    }
}