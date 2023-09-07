namespace IdentityServer.DTOs;

public class AuthenticationModel
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public string UserName { get; set; }
    public string UserEmail { get; set; }
}