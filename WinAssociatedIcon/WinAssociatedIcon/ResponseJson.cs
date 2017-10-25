using WinAssociatedIcon.Interfaces;

namespace WinAssociatedIcon
{
    class ResponseJson : IResponseJson
    {
        public string Base64Data { get; set; }
        public string Path { get; set; }
    }
}
