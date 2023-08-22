namespace FoodOrdering.Application.EmailModels;

public interface IEmailService
{
    Task<bool> SendEmail(Email emailRequest);

}