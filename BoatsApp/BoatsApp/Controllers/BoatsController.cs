using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using BoatsApp.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting; 

namespace BoatsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoatsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public BoatsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select BoatId, UserId, BoatName, BoatDescription, BoatPicture from dbo.Boats";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BoatsAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Boats boats)
        {
            string query = @"
                            insert into dbo.Boats values                   
                            (
                            '" + boats.UserId + @"'
                            ,'" + boats.BoatName + @"'
                            ,'" + boats.BoatDescription + @"'
                            ,'" + boats.BoatPicture + @"'
                            )
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BoatsAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Added Successfully");

        }


        [HttpPut]
        public JsonResult Put(Boats boats)
        {
            string query = @"
                            update dbo.Boats set
                            UserId = '"+boats.UserId+@"'
                            ,BoatName = '"+boats.BoatName+@"'
                            ,BoatDescription = '"+boats.BoatDescription+@"'
                            ,BoatPicture = '"+boats.BoatPicture+@"'
                            where BoatId = "+boats.BoatId+@"
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BoatsAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Update Successfully");

        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Boats
                    where BoatId = " + id + @"
                    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BoatsAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Deleted Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                
                }
                return new JsonResult(filename);

            } 
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        
        
        }

        [Route("GetAllBoatsNames")]
        public JsonResult GetAllBoatsName()
        {
            string query = @"
                   select BoatName from dbo.Boats
                    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BoatsAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("GetAllBoatsName()");

        }

    }
}
