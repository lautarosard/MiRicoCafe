using Aplication.Interfaces.IQR;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace Aplication.Service
{
    public class QRService : IGenerarQrService
    {
        public string GenerarQr(string contenido)
        {

            using var qrGenerator = new QRCodeGenerator();
            using var qrCodeData = qrGenerator.CreateQrCode(contenido, QRCodeGenerator.ECCLevel.Q);
            BitmapByteQRCode bitmapByteQRCode = new BitmapByteQRCode(qrCodeData);
            var bitMap = bitmapByteQRCode.GetGraphic(20);

            using var ms = new MemoryStream();
            ms.Write(bitMap);
            byte[] bytesImage = ms.ToArray();
            return Convert.ToBase64String(bytesImage);
        }
    }
}
