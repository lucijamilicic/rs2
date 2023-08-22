using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IdentityServer.Migrations
{
    public partial class AddedRolesToDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7595d291-2509-4afa-a765-1b0980b7196f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7aa0731a-40fe-4e35-899a-4dc2f644b48d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "616423dc-58fa-40e2-b302-f563f4826cac", "c7c64c09-1e6e-4bf2-9f21-1ebab3681e69", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "86006473-dc1a-4a41-852c-0c0d73364032", "c27a3fe3-eb5c-487e-906c-3095e710e02d", "Buyer", "BUYER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "616423dc-58fa-40e2-b302-f563f4826cac");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "86006473-dc1a-4a41-852c-0c0d73364032");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "7595d291-2509-4afa-a765-1b0980b7196f", "14c28f90-abb2-40cf-ab6a-e1cb38dd48e4", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "7aa0731a-40fe-4e35-899a-4dc2f644b48d", "a654d434-4458-4887-8300-02eebd3b2e78", "Buyer", "BUYER" });
        }
    }
}
