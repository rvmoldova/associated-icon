using WinAssociatedIcon.Interfaces;

namespace WinAssociatedIcon
{
    class ResponseJson : IResponseJson
    {
        public string Base64Image { get; set; }
        public string Path { get; set; }
    }
}
