using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IdentityServer.Migrations
{
    public partial class UsersSnapshot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2d64ab0d-e517-4d58-8a7b-39947eec58ca");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a45a719-d15f-426f-8115-c50895379de8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0550bf35-710b-4efa-9cb2-a7fc4659074e", "daee720f-e51f-450d-91e2-084ffc3eb6f2", "Buyer", "BUYER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "30fae3f6-6c28-4223-a9cc-866e941632d5", "8a52361e-ba6a-453c-83f7-0fea624f1048", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0550bf35-710b-4efa-9cb2-a7fc4659074e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "30fae3f6-6c28-4223-a9cc-866e941632d5");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2d64ab0d-e517-4d58-8a7b-39947eec58ca", "e8f658b1-892b-47a4-9297-92510329a0f2", "Buyer", "BUYER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "6a45a719-d15f-426f-8115-c50895379de8", "8bcaa17e-8553-424c-b7fe-5bc64510d0ef", "Administrator", "ADMINISTRATOR" });
        }
    }
}
