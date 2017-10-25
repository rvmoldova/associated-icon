using System;
using System.Drawing;
using Newtonsoft.Json;
using IWshRuntimeLibrary;
using WinAssociatedIcon.Enums.ExitCodes;

namespace WinAssociatedIcon
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length == 1)
            {
                ResponseJson responseJson = new ResponseJson();

                responseJson.Path = args[0].Trim();
                if (responseJson.Path.EndsWith(".lnk"))
                {
                    responseJson.Path = getShortcutTarget(responseJson.Path);
                }

                responseJson.Base64Data = getIconAsBase64(args[0]);
                Console.WriteLine(JsonConvert.SerializeObject(responseJson));
            }
            else
            {
                Environment.ExitCode = (int)ExitCodes.BadArguments;
            }
        }
        static string getIconAsBase64(string path)
        {

            Icon iconForPath = SystemIcons.Application;

            if (System.IO.File.Exists(path))
            {
                iconForPath = Icon.ExtractAssociatedIcon(path);
            }

            ImageConverter vert = new ImageConverter();
            byte[] data = (byte[])vert.ConvertTo(iconForPath.ToBitmap(), typeof(byte[]));

            return Convert.ToBase64String(data);

        }

        static string getShortcutTarget(string path)
        {

            if (!System.IO.File.Exists(path))
            {
                return "";
            }

            WshShell shell = new WshShell();
            IWshShortcut lnk = (IWshShortcut)shell.CreateShortcut(path);
            return lnk.TargetPath;

        }
    }
}
