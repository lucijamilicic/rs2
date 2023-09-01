using FoodOrdering.Application.EmailModels;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;

namespace FoodOrdering.Infrastructure.Email;

public class EmailService:IEmailService
{
    private readonly EmailSettings _emailSettings;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IOptions<EmailSettings> emailSettings, ILogger<EmailService> logger)
    {
        _emailSettings = emailSettings.Value ?? throw new ArgumentNullException(nameof(emailSettings));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<bool> SendEmail(Application.EmailModels.Email emailRequest)
    {
        var email = new MimeMessage();
        email.Sender = MailboxAddress.Parse(_emailSettings.Mail);
        email.To.Add(MailboxAddress.Parse(emailRequest.To));
        email.Subject = emailRequest.Subject;

        var builder = new BodyBuilder
        {
            HtmlBody = emailRequest.Body,
            TextBody = emailRequest.Body
        };
        email.Body = builder.ToMessageBody();
        
        using var smtp = new SmtpClient();
        await smtp.ConnectAsync(_emailSettings.Host, _emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
        await
            smtp.AuthenticateAsync(_emailSettings.Mail, _emailSettings.Password);

        try
        {
            _logger.LogInformation("Sending email via SMTP server {serverName}", _emailSettings.Host);
            await smtp.SendAsync(email);
        }
        catch (Exception e)
        {
            _logger.LogInformation(
                "An error had occured when sending email via SMTP server {ServerName}: {ErrorMessage}",
                _emailSettings.Host, e.Message);
            return false;
        }
        finally
        {
            await smtp.DisconnectAsync(true);
        }

        return true;
    }
}