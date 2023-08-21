using System.Collections.Generic;
using FoodOrdering.Domain.Common;

namespace FoodOrdering.Domain.Entities
{
    public class FoodItem:EntityBase
    {
        public FoodItem(string foodName, string orderDescription, decimal price, int units)
        {
            FoodName = foodName;
            OrderDescription = orderDescription;
            Price = price;
            Units = units;
        }

        public string FoodName { get; private set; }
        public string OrderDescription { get; private set; }
        public decimal Price { get; private set; }
        public int Units { get; private set; } = 0;

    }
}