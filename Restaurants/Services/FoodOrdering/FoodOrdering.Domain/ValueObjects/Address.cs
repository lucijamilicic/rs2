using System;
using System.Collections.Generic;
using FoodOrdering.Domain.Common;

namespace FoodOrdering.Domain.ValueObjects
{
    public class Address:ValueObject
    {
        public string Street { get; private set; }
        public string City { get; private set; }
        public string Country { get; private set; }
        public string ZipCode { get; private set; }
        public string EmailAddress { get; private set; }

        public Address(string street, string city, string country, string zipCode, string emailAddress)
        {
            Street = street ?? throw new ArgumentNullException(nameof(street));
            City = city ?? throw new ArgumentNullException(nameof(city));
            Country = country ?? throw new ArgumentNullException(nameof(country));
            ZipCode = zipCode ?? throw new ArgumentNullException(nameof(zipCode));
            EmailAddress = emailAddress ?? throw new ArgumentNullException(nameof(emailAddress));
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Street;
            yield return City;
            yield return Country;
            yield return ZipCode;
            yield return EmailAddress;
        }
        
    }
}