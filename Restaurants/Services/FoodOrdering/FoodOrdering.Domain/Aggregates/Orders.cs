using System;
using System.Collections.Generic;
using FoodOrdering.Domain.Common;
using FoodOrdering.Domain.Entities;
using FoodOrdering.Domain.ValueObjects;

namespace FoodOrdering.Domain.Aggregates
{
    public class Orders:AggregateRoot
    {
        public Orders(DateTime orderDate, string buyerName, string buyerAddress, List<OrderItem> listOfOrders)
        {
            OrderDate = orderDate;
            //Id = id ?? throw new ArgumentNullException(nameof(id));
           // BuyerId = buyerId ?? throw new ArgumentNullException(nameof(buyerId));
            BuyerName = buyerName ?? throw new ArgumentNullException(nameof(buyerName));
            BuyerAddress = buyerAddress ?? throw new ArgumentNullException(nameof(buyerAddress));
            ListOfOrders = listOfOrders ?? throw new ArgumentNullException(nameof(listOfOrders));
        }

        public DateTime OrderDate { get; private set; }
       // public string BuyerId { get; private set; }
        public string BuyerName { get; private set; }
        public string BuyerAddress  { get; set; }
        public string BuyerEmailAddress { get; set; }
        public List<OrderItem> ListOfOrders { get; private set; }



    }
}