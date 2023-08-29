using System.Linq.Expressions;
using FoodOrdering.Domain.Common;

namespace FoodOrdering.Application.Persistance;

//TODO: ne treba ovaj fajl
public interface IAsyncRepository<T> where T : AggregateRoot
{
    Task<IReadOnlyList<T>> GetAllAsync(string username);
}