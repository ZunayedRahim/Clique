using Clique.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
namespace Clique.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommunityController : Controller
    {
        private IMongoCollection<Community> communityCollection;
        public CommunityController(IMongoClient client)
        {
            var database = client.GetDatabase("clique");
            communityCollection = database.GetCollection<Community>("community");
        }

        [HttpGet]
        
        public IEnumerable<Community> Get()
        {  
            return communityCollection.Find(s=>true).ToList();
        }

        [HttpPost]
        [Route("add")]
        public string post(Community c)
        {
            
            communityCollection.InsertOne(c);
            return "Thank you for creating a new community";
        }
    }

   
}