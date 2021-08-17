using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Data;
using System.Data.SqlClient;
using WebApi.Helpers;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Route("Report")]
    public class ReportController : ControllerBase
    {

        //conexion para la base de datos
        private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;
        private readonly string _connectionString;


        public ReportController(Microsoft.Extensions.Configuration.IConfiguration _configuration)
        {
            //llamada a la cadena de conexion de la base de datos
            this._configuration = _configuration;
            this._connectionString = _configuration.GetConnectionString("WinAuth");
        } //termina conexion para la base de datos

  
        [HttpPost]  //metodo HTTP
        [Consumes("application/json")]
        [Produces("application/json")]
        [Route("get")] //nombre de la ruta para el select

        public IActionResult GetData(JObject request)
        {
            //variables para los parametros del procedimiento almacenado
            int id_bus = string.IsNullOrEmpty(request.GetValue("id_bus").ToString()) ? 0 : Int32.Parse(request.GetValue("id_bus").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            
            Responses response;


            if (id_bus.Equals("")) //verifica que las variables tengan un dato
            {
                //abre la conexion de la base de datos
                response = new Responses(2, null);
                return BadRequest(response.Respuestas());
            }
            try
            {
                using SqlConnection conn = new SqlConnection(this._connectionString);

                {
                    try
                    {
                        conn.Open();
                    }
                    catch (Exception e)
                    {
                        response = new Responses(2, e.ToString());
                        return BadRequest(e.ToString());
                    }

                    using SqlCommand cmd = new SqlCommand("sp_vista", conn); //llamada al procedimiento almacenado de la base de datos
                    {
                        cmd.CommandType = CommandType.StoredProcedure; //declara parametros de procedimento almacenado
                        DataSet dataSet = new DataSet();

                        cmd.Parameters.AddWithValue("@Operacion", 4); //opcion 4 es para select
                                                                      //parametros que pide el procedimiento almacenado
                        cmd.Parameters.AddWithValue("@id_bus", id_bus);

                        SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                        adapter.Fill(dataSet);

                        //si hay una respuesta correcta retorna un Ok de lo contrario retorna un BadRequest
                        if (dataSet.Tables[0].Rows.Count > 0)
                        {

                            return Ok(dataSet);
                        }
                        else
                        {
                            response = new Responses(2, "Informacion encontrada");
                            return NotFound();
                        }
                    }
                }
            }
            catch (Exception e)
            {
                response = new Responses(2, e.ToString());
                return BadRequest(e.ToString());

            }
        }


    }
}
