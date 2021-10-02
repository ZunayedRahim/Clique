using Clique.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Clique.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace Clique.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ThreadController : Controller
    {
        private IMongoCollection<Thread> threadCollection;
        private readonly string _userId;
        private readonly IBlogService _blogService; 
        public ThreadController(IMongoClient client,IBlogService _blogService )
        {
            var database = client.GetDatabase("clique");
            threadCollection = database.GetCollection<Thread>("thread");
            this._blogService = _blogService;
            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
            _userId = (string)_httpContextAccessor.HttpContext.Items["UserId"];
        }

        [HttpGet]
        
        public IEnumerable<Thread> Get()
        {  
            
            Console.WriteLine("uid:" + _userId);
            return threadCollection.Find(s=>true).ToList();
        }

        [Authorize]
        [HttpGet]
        [Route("privatethread")]
        public IEnumerable<Thread> GetPrivateThread()
        {  
            
            Console.WriteLine("uid:" + _userId);
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