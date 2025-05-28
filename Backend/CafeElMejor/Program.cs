using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Infrastructure;
using Infrastructure.Data;
using Aplication.Interfaces.IProveedor;
using Infrastructure.Command;
using Aplication.Service;
using Infrastructure.Querys;
using Aplication.Interfaces.IProducto;
using Aplication.Interfaces.IOC;
using Aplication.Interfaces.IND;
using Aplication.Interfaces.INC;
using Aplication.Interfaces.IFactura;
using Aplication.Interfaces.ICobranza;
using Aplication.Interfaces.ICliente;
using Aplication.Interfaces.IQR;
using Aplication.Interfaces.IAuth;
using Aplication.Interfaces.IUsuario;
using Aplication.Interfaces.IJwtGenerator;
using Aplication.Interfaces.IAdministrador;
using Aplication.Interfaces.IItemCarrito;

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
            
            //INYECCIONES
            //builder Proveedor
            builder.Services.AddScoped<IProveedorCommand, ProveedorCommand>();
            builder.Services.AddScoped<IProveedorQuery, ProveedorQuery>();
            builder.Services.AddScoped<IProveedorService, ProveedorService>();

            //builder Cliente
            builder.Services.AddScoped<IClienteCommand, ClienteCommand>();
            builder.Services.AddScoped<IClienteQuery, ClienteQuery>();
            builder.Services.AddScoped<IClienteService, ClienteService>();

            //builder Cobranza
            builder.Services.AddScoped<ICobranzaCommand, CobranzaCommand>();
            builder.Services.AddScoped<ICobranzaQuery, CobranzaQuery>();
            builder.Services.AddScoped<ICobranzaService, CobranzaService>();

            //builder Factura
            builder.Services.AddScoped<IFacturaCommand, FacturaCommand>();
            builder.Services.AddScoped<IFacturaQuery, FacturaQuery>();
            builder.Services.AddScoped<IFacturaService, FacturaService>();

            //builder NC
            builder.Services.AddScoped<INCCommand, NCCommand>();
            builder.Services.AddScoped<INCQuery, NCQuery>();
            builder.Services.AddScoped<INCService, NCService>();

            //builder ND
            builder.Services.AddScoped<INDCommand, NDCommand>();
            builder.Services.AddScoped<INDQuery, NDQuery>();
            builder.Services.AddScoped<INDService, NDService>();

            //builder OC
            builder.Services.AddScoped<IOCCommand, OCCommand>();
            builder.Services.AddScoped<IOCQuery, OCQuery>();
            builder.Services.AddScoped<IOCService, OCService>();

            //builder Producto
            builder.Services.AddScoped<IProductoCommand, ProductoCommand>();
            builder.Services.AddScoped<IProductoQuery, ProductoQuery>();
            builder.Services.AddScoped<IProductoService, ProductoService>();

            //builder Usuario
            builder.Services.AddScoped<IUsuarioCommand, UsuarioCommand>();
            builder.Services.AddScoped<IUsuarioQuery, UsuarioQuery>();
            builder.Services.AddScoped<IUsuarioService, UsuarioService>();

            //builder ItemCarrito
            builder.Services.AddScoped<IItemCarritoCommand, ItemCarritoCommand>();
            builder.Services.AddScoped<IItemCarritoQuery, ItemCarritoQuery>();
            builder.Services.AddScoped<IItemCarritoService, ItemCarritoService>();

            //Auth y JwtGeneratorService
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IJwtGeneratorService, JwtGeneratorService>();


            //builder QR
            builder.Services.AddScoped<IGenerarQrService, QRService>();


            //Automapper
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            //
            var app = builder.Build();

           
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
