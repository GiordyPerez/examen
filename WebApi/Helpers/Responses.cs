using Newtonsoft.Json.Linq;

namespace WebApi.Helpers
{
    public class Responses
    {
        private int value;
        private string exception;

        public Responses(int val, string? ex)
        {
            value = val;
            this.exception = ex;
        }

        public JObject Respuestas()
        {
            dynamic data = new JObject();
            
            switch (value)
            {
                case 1:
                    data.value = 1;
                    data.message = "Solicitud procesada con exito";
                    data.response = 1;
                    return data;

                case 2:
                    data.value = 2;
                    data.message = exception;
                    data.response = 2;
                    return data;

                default:
                    data.value = 0;
                    data.message = "template";
                    data.response = 0;
                    return data;
            }
        }
    }
}
