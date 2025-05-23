using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Infrastructure;
using Infrastructure.Data;
using Aplication.Interfaces.IProveedor;
using Infrastructure.Command;

namespace CafeElMejor
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // 1. Configuración básica

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Cafe API",
                    Version = "v1",
                    Description = "API para gestión de Mi Rico Cafe"
                });
            });

            // 2. Configuración de base de datos
           builder.Services.AddDbContext<CafeDbContext>(options =>
            options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
            ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));
           
            var app = builder.Build();

            //INYECCIONES
            //builder Proveedor
            builder.Services.AddScoped<IProveedorCommand, ProveedorCommand>();


            // Configura el pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cafe API v1");
                    c.RoutePrefix = "swagger"; // Esto fuerza a que Swagger sea la página inicial
                });
            }



            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();
            
            app.Run();
        }
    }
}
