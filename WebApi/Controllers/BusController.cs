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
    public class BusController : ControllerBase
    {

        //conexion para la base de datos
        private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;
        private readonly string _connectionString;


        public BusController(Microsoft.Extensions.Configuration.IConfiguration _configuration)
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
            int id_bus = string.IsNullOrEmpty(request.GetValue("id_bus").ToString()) ? 0 : Int32.Parse(request.GetValue("id_bus").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string bus = string.IsNullOrEmpty(request.GetValue("bus").ToString()) ? "" : request.GetValue("bus").ToString();                                  //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string matricula = string.IsNullOrEmpty(request.GetValue("matricula").ToString()) ? "" : request.GetValue("matricula").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string modelo = string.IsNullOrEmpty(request.GetValue("modelo").ToString()) ? "" : request.GetValue("modelo").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int capacidad_asientos = string.IsNullOrEmpty(request.GetValue("capacidad_asientos").ToString()) ? 0 : Int32.Parse(request.GetValue("capacidad_asientos").ToString());    //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string nombre_piloto = string.IsNullOrEmpty(request.GetValue("nombre_piloto").ToString()) ? "" : request.GetValue("nombre_piloto").ToString();                               //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena 
            string estado_bus = string.IsNullOrEmpty(request.GetValue("estado_bus").ToString()) ? "" : request.GetValue("estado_bus").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int id_ruta = string.IsNullOrEmpty(request.GetValue("id_ruta").ToString()) ? 0 : Int32.Parse(request.GetValue("id_ruta").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 

            Responses response;


            if (id_bus.Equals("") && bus.Equals("") && matricula.Equals("") && modelo.Equals("")
            && capacidad_asientos.Equals("") && nombre_piloto.Equals("") && estado_bus.Equals("") && id_ruta.Equals("")) //verifica que las variables tengan un dato
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

                    using SqlCommand cmd = new SqlCommand("sp_buses", conn); //llamada al procedimiento almacenado de la base de datos
                    {
                        cmd.CommandType = CommandType.StoredProcedure; //declara parametros de procedimento almacenado
                        DataSet dataSet = new DataSet();

                        cmd.Parameters.AddWithValue("@Operacion", 4); //opcion 4 es para select
                                                                      //parametros que pide el procedimiento almacenado
                        cmd.Parameters.AddWithValue("@id_bus", 1);
                        cmd.Parameters.AddWithValue("@bus", bus);
                        cmd.Parameters.AddWithValue("@matricula", matricula);
                        cmd.Parameters.AddWithValue("@modelo", modelo);
                        cmd.Parameters.AddWithValue("@capacidad_asientos", capacidad_asientos);
                        cmd.Parameters.AddWithValue("@nombre_piloto", nombre_piloto);
                        cmd.Parameters.AddWithValue("@estado_bus", estado_bus);
                        cmd.Parameters.AddWithValue("@id_ruta", id_ruta);


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
            int id_bus = string.IsNullOrEmpty(request.GetValue("id_bus").ToString()) ? 0 : Int32.Parse(request.GetValue("id_bus").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string bus = string.IsNullOrEmpty(request.GetValue("bus").ToString()) ? "" : request.GetValue("bus").ToString();                                  //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string matricula = string.IsNullOrEmpty(request.GetValue("matricula").ToString()) ? "" : request.GetValue("matricula").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string modelo = string.IsNullOrEmpty(request.GetValue("modelo").ToString()) ? "" : request.GetValue("modelo").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int capacidad_asientos = string.IsNullOrEmpty(request.GetValue("capacidad_asientos").ToString()) ? 0 : Int32.Parse(request.GetValue("capacidad_asientos").ToString());    //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string nombre_piloto = string.IsNullOrEmpty(request.GetValue("nombre_piloto").ToString()) ? "" : request.GetValue("nombre_piloto").ToString();                               //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena 
            string estado_bus = string.IsNullOrEmpty(request.GetValue("estado_bus").ToString()) ? "" : request.GetValue("estado_bus").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int id_ruta = string.IsNullOrEmpty(request.GetValue("id_ruta").ToString()) ? 0 : Int32.Parse(request.GetValue("id_ruta").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
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

                    using SqlCommand cmd = new SqlCommand("sp_buses", conn); //llamada al procedimiento almacenado de la base de datos
                    {
                        cmd.CommandType = CommandType.StoredProcedure; //declara parametros de procedimento almacenado

                        cmd.Parameters.AddWithValue("@Operacion", 1); //opcion 1 es para insert
                                                                    //parametros que pide el procedimiento almacenado
                        cmd.Parameters.AddWithValue("@id_bus", 1);
                        cmd.Parameters.AddWithValue("@bus", bus);
                        cmd.Parameters.AddWithValue("@matricula", matricula);
                        cmd.Parameters.AddWithValue("@modelo", modelo);
                        cmd.Parameters.AddWithValue("@capacidad_asientos", capacidad_asientos);
                        cmd.Parameters.AddWithValue("@nombre_piloto", nombre_piloto);
                        cmd.Parameters.AddWithValue("@estado_bus", estado_bus);
                        cmd.Parameters.AddWithValue("@id_ruta", id_ruta);

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
            int id_bus = string.IsNullOrEmpty(request.GetValue("id_bus").ToString()) ? 0 : Int32.Parse(request.GetValue("id_bus").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string bus = string.IsNullOrEmpty(request.GetValue("bus").ToString()) ? "" : request.GetValue("bus").ToString();                                  //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string matricula = string.IsNullOrEmpty(request.GetValue("matricula").ToString()) ? "" : request.GetValue("matricula").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string modelo = string.IsNullOrEmpty(request.GetValue("modelo").ToString()) ? "" : request.GetValue("modelo").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int capacidad_asientos = string.IsNullOrEmpty(request.GetValue("capacidad_asientos").ToString()) ? 0 : Int32.Parse(request.GetValue("capacidad_asientos").ToString());    //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string nombre_piloto = string.IsNullOrEmpty(request.GetValue("nombre_piloto").ToString()) ? "" : request.GetValue("nombre_piloto").ToString();                               //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena 
            string estado_bus = string.IsNullOrEmpty(request.GetValue("estado_bus").ToString()) ? "" : request.GetValue("estado_bus").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int id_ruta = string.IsNullOrEmpty(request.GetValue("id_ruta").ToString()) ? 0 : Int32.Parse(request.GetValue("id_ruta").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
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
                    using SqlCommand cmd = new SqlCommand("sp_buses", conn); //llamada al procedimiento almacenado de la base de datos
                    {
                        cmd.CommandType = CommandType.StoredProcedure; //declara parametros de procedimento 
                        cmd.Parameters.AddWithValue("@Operacion", 2); //opcion 2 es para update
                                                                      //parametros que pide el procedimiento almacenado
                        cmd.Parameters.AddWithValue("@id_bus", id_bus);
                        cmd.Parameters.AddWithValue("@bus", bus);
                        cmd.Parameters.AddWithValue("@matricula", matricula);
                        cmd.Parameters.AddWithValue("@modelo", modelo);
                        cmd.Parameters.AddWithValue("@capacidad_asientos", capacidad_asientos);
                        cmd.Parameters.AddWithValue("@nombre_piloto", nombre_piloto);
                        cmd.Parameters.AddWithValue("@estado_bus", estado_bus);
                        cmd.Parameters.AddWithValue("@id_ruta", id_ruta);

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
            int id_bus = string.IsNullOrEmpty(request.GetValue("id_bus").ToString()) ? 0 : Int32.Parse(request.GetValue("id_bus").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string bus = string.IsNullOrEmpty(request.GetValue("bus").ToString()) ? "" : request.GetValue("bus").ToString();                                  //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string matricula = string.IsNullOrEmpty(request.GetValue("matricula").ToString()) ? "" : request.GetValue("matricula").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            string modelo = string.IsNullOrEmpty(request.GetValue("modelo").ToString()) ? "" : request.GetValue("modelo").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int capacidad_asientos = string.IsNullOrEmpty(request.GetValue("capacidad_asientos").ToString()) ? 0 : Int32.Parse(request.GetValue("capacidad_asientos").ToString());    //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
            string nombre_piloto = string.IsNullOrEmpty(request.GetValue("nombre_piloto").ToString()) ? "" : request.GetValue("nombre_piloto").ToString();                               //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena 
            string estado_bus = string.IsNullOrEmpty(request.GetValue("estado_bus").ToString()) ? "" : request.GetValue("estado_bus").ToString();                            //verifica que la variable este recibiendo un dato, de lo contrario le asigna una cadena vacia
            int id_ruta = string.IsNullOrEmpty(request.GetValue("id_ruta").ToString()) ? 0 : Int32.Parse(request.GetValue("id_ruta").ToString());                //verifica que la variable este recibiendo un dato, de lo contrario le asigna un 0 
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
                    using SqlCommand cmd = new SqlCommand("sp_buses", conn); //llamada al procedimiento almacenado de la base de datos
                    {
                        cmd.CommandType = CommandType.StoredProcedure; //declara parametros de procedimento 
                        cmd.Parameters.AddWithValue("@Operacion", 3); //opcion 2 es para update
                                                                      //parametros que pide el procedimiento almacenado
                        cmd.Parameters.AddWithValue("@id_bus", id_bus);
                        cmd.Parameters.AddWithValue("@bus", bus);
                        cmd.Parameters.AddWithValue("@matricula", matricula);
                        cmd.Parameters.AddWithValue("@modelo", modelo);
                        cmd.Parameters.AddWithValue("@capacidad_asientos", capacidad_asientos);
                        cmd.Parameters.AddWithValue("@nombre_piloto", nombre_piloto);
                        cmd.Parameters.AddWithValue("@estado_bus", estado_bus);
                        cmd.Parameters.AddWithValue("@id_ruta", id_ruta);

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
