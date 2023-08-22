using IdentityServer.Entities;
using IdentityServer.EntityTypeConfigurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.Data
{
    public class IdentityContext : IdentityDbContext<User>
    {
        public DbSet<RefreshToken> RefreshTokens { get; set; } = null!;
        public IdentityContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new RoleConfiguration());
            builder.ApplyConfiguration(new UserConfiguration());
        }

    }
}
