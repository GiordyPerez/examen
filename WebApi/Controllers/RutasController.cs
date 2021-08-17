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
    [Route("Crud")]
    public class RutasController : ControllerBase
    {

        //conexion para la base de datos
        private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;
        private readonly string _connectionString;


        public RutasController(Microsoft.Extensions.Configuration.IConfiguration _configuration)
        {
            //llamada a la cadena de conexion de la base de datos
            this._configuration = _configuration;
            this._connectionString = _configuration.GetConnectionString("WinAuth");
        } //termina conexion para la base de datos

        //[Authorize]
        [HttpPost]  //metodo HTTP
        [Consumes("application/json")]
        [Produces("application/json")]
        [Route("get")] //nombre de la ruta para el select

        public IActionResult GetData(JObject request)
        {
            //variables para los parametros del procedimiento almacenado
            int id_ruta = string.IsNullOrEmpty(request.GetValue("id_ruta").ToString()) ? 0 : Int32.Parse(request.GetValue("id_ruta").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string ruta = string.IsNullOrEmpty(request.GetValue("ruta").ToString()) ? "" : request.GetValue("ruta").ToString();                                  //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int km_tot = string.IsNullOrEmpty(request.GetValue("km_tot").ToString()) ? 0 : Int32.Parse(request.GetValue("km_tot").ToString());    //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string origen = string.IsNullOrEmpty(request.GetValue("origen").ToString()) ? "" : request.GetValue("origen").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string final = string.IsNullOrEmpty(request.GetValue("final").ToString()) ? "" : request.GetValue("final").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string estado = string.IsNullOrEmpty(request.GetValue("estado").ToString()) ? "" : request.GetValue("estado").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int id_ciudad = string.IsNullOrEmpty(request.GetValue("id_ciudad").ToString()) ? 0 : Int32.Parse(request.GetValue("id_ciudad").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 

            Responses response;


            if (id_ruta.Equals("") && ruta.Equals("") && km_tot.Equals("") && origen.Equals("")
            && final.Equals("") &&  estado.Equals("") && id_ciudad.Equals("")) //verifica que las variables tengan un dato
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

                    using SqlCommand cmd = new SqlCommand("sp_rutas", conn); //llamada al procedimiento almacenado de la base de datos
                    {
                        cmd.CommandType = CommandType.StoredProcedure; //declara parametros de procedimento almacenado
                        DataSet dataSet = new DataSet();

                        cmd.Parameters.AddWithValue("@Operacion", 4); //opcion 4 es para select
                                                                      //parametros que pide el procedimiento almacenado
                        cmd.Parameters.AddWithValue("@id_ruta", 1);
                        cmd.Parameters.AddWithValue("@ruta", ruta);
                        cmd.Parameters.AddWithValue("@km_tot", km_tot);
                        cmd.Parameters.AddWithValue("@origen", origen);
                        cmd.Parameters.AddWithValue("@final", final);
                        cmd.Parameters.AddWithValue("@id_ciudad", id_ciudad);
                        cmd.Parameters.AddWithValue("@estado", estado);



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

        //[Authorize]
        [HttpPost] //metodo HTTP
        [Consumes("application/json")]
        [Produces("application/json")]
        [Route("store")] //nombre de la ruta para el insert

        public IActionResult Store(JObject request)
        {
            //variables para los parametros del procedimiento almacenado
            int id_ruta = string.IsNullOrEmpty(request.GetValue("id_ruta").ToString()) ? 0 : Int32.Parse(request.GetValue("id_ruta").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string ruta = string.IsNullOrEmpty(request.GetValue("ruta").ToString()) ? "" : request.GetValue("ruta").ToString();                                  //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int km_tot = string.IsNullOrEmpty(request.GetValue("km_tot").ToString()) ? 0 : Int32.Parse(request.GetValue("km_tot").ToString());    //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string origen = string.IsNullOrEmpty(request.GetValue("origen").ToString()) ? "" : request.GetValue("origen").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string final = string.IsNullOrEmpty(request.GetValue("final").ToString()) ? "" : request.GetValue("final").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string estado = string.IsNullOrEmpty(request.GetValue("estado").ToString()) ? "" : request.GetValue("estado").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int id_ciudad = string.IsNullOrEmpty(request.GetValue("id_ciudad").ToString()) ? 0 : Int32.Parse(request.GetValue("id_ciudad").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
                                                                                                                                                                       //string pContrasenia = string.IsNullOrEmpty(request.GetValue("contrasenia").ToString()) ? "" : BCrypt.Net.BCrypt.HashPassword(request.GetValue("contrasenia").ToString());                   //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia

            //abre la conexion de la base de datos
            Responses response;
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

                    using SqlCommand cmd = new SqlCommand("sp_rutas", conn); //llamada al procedimiento almacenado de la base de datos
                    {
                        cmd.CommandType = CommandType.StoredProcedure; //declara parametros de procedimento almacenado

                        cmd.Parameters.AddWithValue("@Operacion", 1); //opcion 1 es para insert
                                                                      //parametros que pide el procedimiento almacenado
                        cmd.Parameters.AddWithValue("@id_ruta", id_ruta);
                        cmd.Parameters.AddWithValue("@ruta", ruta);
                        cmd.Parameters.AddWithValue("@km_tot", km_tot);
                        cmd.Parameters.AddWithValue("@origen", origen);
                        cmd.Parameters.AddWithValue("@final", final);
                        cmd.Parameters.AddWithValue("@id_ciudad", id_ciudad);
                        cmd.Parameters.AddWithValue("@estado", estado);


                        var result = cmd.ExecuteNonQuery(); //variable de respuesta del procedimiento almacenado

                        //si hay una respuesta correcta retorna un Ok de lo contrario retorna un BadRequest
                        if (result > 0)
                        {
                            response = new Responses(1, null);
                            return Ok(response.Respuestas());
                        }
                        else
                        {
                            response = new Responses(2, null);
                            return BadRequest(response.Respuestas());

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


        ///[Authorize]
        [HttpPut] //metodo HTTP
        [Consumes("application/json")]
        [Produces("application/json")]
        [Route("update")] //nombre de la ruta para el update
        public IActionResult update(JObject request)
        {

            //variables para los parametros del procedimiento almacenado
            int id_ruta = string.IsNullOrEmpty(request.GetValue("id_ruta").ToString()) ? 0 : Int32.Parse(request.GetValue("id_ruta").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string ruta = string.IsNullOrEmpty(request.GetValue("ruta").ToString()) ? "" : request.GetValue("ruta").ToString();                                  //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int km_tot = string.IsNullOrEmpty(request.GetValue("km_tot").ToString()) ? 0 : Int32.Parse(request.GetValue("km_tot").ToString());    //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string origen = string.IsNullOrEmpty(request.GetValue("origen").ToString()) ? "" : request.GetValue("origen").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string final = string.IsNullOrEmpty(request.GetValue("final").ToString()) ? "" : request.GetValue("final").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string estado = string.IsNullOrEmpty(request.GetValue("estado").ToString()) ? "" : request.GetValue("estado").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int id_ciudad = string.IsNullOrEmpty(request.GetValue("id_ciudad").ToString()) ? 0 : Int32.Parse(request.GetValue("id_ciudad").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
                                                                                                                                                                       // string pContrasenia = string.IsNullOrEmpty(request.GetValue("contrasenia").ToString()) ? null : BCrypt.Net.BCrypt.HashPassword(request.GetValue("contrasenia").ToString());                   //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia

            //abre la conexion de la base de datos
            Responses response;
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
                    using SqlCommand cmd = new SqlCommand("sp_rutas", conn); //llamada al procedimiento almacenado de la base de datos
                    {
                        cmd.CommandType = CommandType.StoredProcedure; //declara parametros de procedimento 
                        cmd.Parameters.AddWithValue("@Operacion", 2); //opcion 2 es para update
                                                                      //parametros que pide el procedimiento almacenado
                        cmd.Parameters.AddWithValue("@id_ruta", id_ruta);
                        cmd.Parameters.AddWithValue("@ruta", ruta);
                        cmd.Parameters.AddWithValue("@km_tot", km_tot);
                        cmd.Parameters.AddWithValue("@origen", origen);
                        cmd.Parameters.AddWithValue("@final", final);
                        cmd.Parameters.AddWithValue("@id_ciudad", id_ciudad);
                        cmd.Parameters.AddWithValue("@estado", estado);

                        var result = cmd.ExecuteNonQuery(); //variable de respuesta del procedimiento almacenado

                        //si hay una respuesta correcta retorna un Ok de lo contrario retorna un BadRequest
                        if (result > 0)
                        {
                            response = new Responses(1, null);
                            return Ok(response.Respuestas());
                        }
                        else
                        {
                            response = new Responses(2, null);
                            return BadRequest(response.Respuestas());

                        }
                    }
                }
            }
            catch (Exception e)
            {
                response = new Responses(2, e.ToString());
                return BadRequest(response);
            }
        }


        ///[Authorize]
        [HttpPut] //metodo HTTP
        [Consumes("application/json")]
        [Produces("application/json")]
        [Route("updateEstado")] //nombre de la ruta para el update
        public IActionResult updateEstado(JObject request)
        {

            //variables para los parametros del procedimiento almacenado
            int id_ruta = string.IsNullOrEmpty(request.GetValue("id_ruta").ToString()) ? 0 : Int32.Parse(request.GetValue("id_ruta").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string ruta = string.IsNullOrEmpty(request.GetValue("ruta").ToString()) ? "" : request.GetValue("ruta").ToString();                                  //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int km_tot = string.IsNullOrEmpty(request.GetValue("km_tot").ToString()) ? 0 : Int32.Parse(request.GetValue("km_tot").ToString());    //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string origen = string.IsNullOrEmpty(request.GetValue("origen").ToString()) ? "" : request.GetValue("origen").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string final = string.IsNullOrEmpty(request.GetValue("final").ToString()) ? "" : request.GetValue("final").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string estado = string.IsNullOrEmpty(request.GetValue("estado").ToString()) ? "" : request.GetValue("estado").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int id_ciudad = string.IsNullOrEmpty(request.GetValue("id_ciudad").ToString()) ? 0 : Int32.Parse(request.GetValue("id_ciudad").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
                                                                                                                                                                       // string pContrasenia = string.IsNullOrEmpty(request.GetValue("contrasenia").ToString()) ? null : BCrypt.Net.BCrypt.HashPassword(request.GetValue("contrasenia").ToString());                   //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia

            //abre la conexion de la base de datos
            Responses response;
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
                    using SqlCommand cmd = new SqlCommand("sp_rutas", conn); //llamada al procedimiento almacenado de la base de datos
                    {
                        cmd.CommandType = CommandType.StoredProcedure; //declara parametros de procedimento 
                        cmd.Parameters.AddWithValue("@Operacion", 3); //opcion 2 es para update
                                                                      //parametros que pide el procedimiento almacenado
                        cmd.Parameters.AddWithValue("@id_ruta", id_ruta);
                        cmd.Parameters.AddWithValue("@ruta", ruta);
                        cmd.Parameters.AddWithValue("@km_tot", km_tot);
                        cmd.Parameters.AddWithValue("@origen", origen);
                        cmd.Parameters.AddWithValue("@final", final);
                        cmd.Parameters.AddWithValue("@id_ciudad", id_ciudad);
                        cmd.Parameters.AddWithValue("@estado", estado);

                        var result = cmd.ExecuteNonQuery(); //variable de respuesta del procedimiento almacenado

                        //si hay una respuesta correcta retorna un Ok de lo contrario retorna un BadRequest
                        if (result > 0)
                        {
                            response = new Responses(1, null);
                            return Ok(response.Respuestas());
                        }
                        else
                        {
                            response = new Responses(2, null);
                            return BadRequest(response.Respuestas());

                        }
                    }
                }
            }
            catch (Exception e)
            {
                response = new Responses(2, e.ToString());
                return BadRequest(response);
            }
        }
    }
}
