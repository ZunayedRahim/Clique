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
    public class ThreadController : Controller
    {
        private IMongoCollection<Thread> threadCollection;
        public ThreadController(IMongoClient client)
        {
            var database = client.GetDatabase("clique");
            threadCollection = database.GetCollection<Thread>("thread");
        }

        [HttpGet]
        public IEnumerable<Thread> Get()
        {  
            return threadCollection.Find(s=>true).ToList();
        }

        [HttpPost]
        [Route("add")]
        public string post(Thread t)
        {
            
            threadCollection.InsertOne(t);
            return "Thank you for posting a new thread";
        }
    }

   
}