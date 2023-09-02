using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using IdentityServer.Data;
using IdentityServer.DTOs;
using IdentityServer.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace IdentityServer.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly ApplicationContext _dbContext;

    public AuthenticationService(UserManager<User> userManager, IConfiguration configuration, ApplicationContext dbContext)
    {
        _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    public async Task<User?> ValidateUser(UserCredentialsDto userCredentials)
    {
        var user = await _userManager.FindByNameAsync(userCredentials.UserName);
        if (user is null || !await _userManager.CheckPasswordAsync(user, userCredentials.Password))
        {
            return null;
        }
        return user;
    }

    public async Task<AuthenticationModel> CreateAuthenticationModel(User user)
    {
        var accessToken = await CreateAccessToken(user);
        var refreshToken = await CreateRefreshToken();
        user.RefreshTokens.Add(refreshToken);
        await _userManager.UpdateAsync(user);
        return new AuthenticationModel { AccessToken = accessToken, RefreshToken = refreshToken.Token, UserName = user.UserName, RoleName = (await _userManager.GetRolesAsync(user))[0]};
    }

    public async Task RemoveRefreshToken(User user, string refreshToken)
    {
        user.RefreshTokens.RemoveAll(r => r.Token == refreshToken);
        await _userManager.UpdateAsync(user);

        var token = _dbContext.RefreshTokens.FirstOrDefault(r => r.Token == refreshToken);
        if (token is null)
        {
            return;
        }

        _dbContext.RefreshTokens.Remove(token);
        await _dbContext.SaveChangesAsync();
    }

    private async Task<string> CreateAccessToken(User user)
    {
        var signingCredentials = GetSigningCredentials();
        var claims = await GetClaims(user);
        var token = GenerateToken(signingCredentials, claims);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private SigningCredentials GetSigningCredentials()
    {
        var key = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JwtSettings:secretKey"));
        var secret = new SymmetricSecurityKey(key);

        return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
    }

    private async Task<IEnumerable<Claim>> GetClaims(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.Email, user.Email),
        };

        var roles = await _userManager.GetRolesAsync(user);
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        return claims;
    }

    private JwtSecurityToken GenerateToken(SigningCredentials signingCredentials, IEnumerable<Claim> claims)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");

        var token = new JwtSecurityToken
        (
            issuer: jwtSettings.GetSection("validIssuer").Value,
            audience: jwtSettings.GetSection("validAudience").Value,
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("expires").Value)),
            signingCredentials: signingCredentials
        );

        return token;
    }
    
    private async Task<RefreshToken> CreateRefreshToken()
    {
        var randomBytes = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);

        var token = new RefreshToken
        {
            Token = Convert.ToBase64String(randomBytes),
            ExpiryTime = DateTime.Now.AddDays(Convert.ToDouble(_configuration.GetValue<string>("RefreshTokenExpires")))
        };

        _dbContext.RefreshTokens.Add(token);
        await _dbContext.SaveChangesAsync();

        return token;
    }
}