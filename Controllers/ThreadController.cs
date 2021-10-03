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
using System.Threading.Tasks;

namespace Clique.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ThreadController : Controller
    {
        private IMongoCollection<Thread> threadCollection;
        private IMongoCollection<User> userCollection;
        private readonly string _userId;
        private readonly IBlogService _blogService; 
        public ThreadController(IMongoClient client,IBlogService _blogService )
        {
            var database = client.GetDatabase("clique");
            threadCollection = database.GetCollection<Thread>("thread");

           userCollection = database.GetCollection<User>("user");
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
        [Authorize]
        [HttpPost]
        [Route("add")]
        public string post(Thread t)
        {
            t.OP_id = _userId;
            Console.WriteLine("model "+t.OP_id);
        
            var user  =  userCollection.Find(x=>x.Id == _userId).FirstOrDefault();
            t.OP_name = user.Username;

            threadCollection.InsertOne(t);
            return "Thank you for posting a new thread";
        }

        // GET /[thread]/:id
        [HttpGet]
        [Route("{id}")]
        async public Task<ActionResult> GetPostById(string id)
        {

            Console.WriteLine("here");
            Thread thread = await _blogService.GetPostById(id);
            Console.WriteLine("here");
            if (thread == null)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, "Something is wrong"));
            }
            return Ok(thread);
        }
    }

   
}