using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace IdentityServer.Data;

public class DesignTimeApplicationContextFactory : IDesignTimeDbContextFactory<IdentityContext>
{
    public IdentityContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<IdentityContext>();
        optionsBuilder.UseSqlServer();
        return new IdentityContext(optionsBuilder.Options);
    }
}