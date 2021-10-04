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

        private IMongoCollection<Voting> votingCollection;

        private IMongoCollection<Comment> commentCollection;
        private readonly string _userId;
        private readonly IBlogService _blogService; 
        public ThreadController(IMongoClient client,IBlogService _blogService )
        {
            var database = client.GetDatabase("clique");
            threadCollection = database.GetCollection<Thread>("thread");

           userCollection = database.GetCollection<User>("user");
           votingCollection = database.GetCollection<Voting>("vote");
           commentCollection = database.GetCollection<Comment>("comment");
            this._blogService = _blogService;
            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
            _userId = (string)_httpContextAccessor.HttpContext.Items["UserId"];
        }

        //Get user id 
        [HttpGet]

        public IEnumerable<Thread> Get()
        {  
            
            Console.WriteLine("uid:" + _userId);
            return threadCollection.Find(s=>true).ToList();
        }

        //View all private threads
        [Authorize]
        [HttpGet]
        [Route("privatethread")]
        public IEnumerable<Thread> GetPrivateThread()
        {  
            
            Console.WriteLine("uid:" + _userId);
            return threadCollection.Find(s=>true).ToList();
        }

        //Create a new Thread
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

            Console.WriteLine("post id: "+id);

            Thread thread = await _blogService.GetPostById(id);
            Console.WriteLine("here");
            if (thread == null)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, "Something is wrong"));
            }
            return Ok(thread);
        }

        // [Authorize]
        // [HttpGet]
        // [Route("addUpvote/{id}")]
        //  public string addUpvote(Voting v,string id)
        //  {
        //     Console.WriteLine("Inside upvoting controller");
        //     Console.WriteLine("PostId: "+ id);
        //     Console.WriteLine("UId: "+ _userId);
        //     v.PostId = id;
        //     v.UserId = _userId;
        //     v.Type = "upvote";
            
        //     votingCollection.InsertOne(v);
        //     return "Upvoted Successfully";
        //  }
        
        //Upvote a thread
        [Authorize]
        [HttpGet]
        [Route("addUpvote/{id}")]
         public int addUpvote(string id)
         {
            
            Voting v = new Voting();
            v.PostId = id;
            v.UserId = _userId;
            Console.WriteLine(v.UserId);
            Console.WriteLine("UID inside upvote"+_userId);
            v.Type = "upvote";
            var existingUser = votingCollection.Find(x => x.PostId == v.PostId && x.UserId == v.UserId && x.Type=="upvote").FirstOrDefault();
            if(existingUser==null)
            {
                Console.WriteLine("Didn't upvote previously");
                votingCollection.InsertOne(v);

                var filter = Builders<Thread>.Filter.Eq("Id",v.PostId);
                var update = Builders<Thread>.Update.Inc("upvote",1);

                threadCollection.UpdateOne(filter,update);
            }
            else
            {
                Console.WriteLine("upvoted previously");
                var filter = Builders<Voting>.Filter.Eq("PostId",v.PostId);
                filter &= (Builders<Voting>.Filter.Eq("UserId",v.UserId));
                votingCollection.DeleteMany(filter);

                var filter2 = Builders<Thread>.Filter.Eq("Id",v.PostId);
                var update = Builders<Thread>.Update.Inc("upvote",-1);

                threadCollection.UpdateOne(filter2,update);

            }
            
            var upvotedThread = threadCollection.Find(x=> x.Id == v.PostId).FirstOrDefault();
            var upvoteNumber = upvotedThread.Upvote;
            return upvoteNumber;
         }


        //Downvote a thread
        [Authorize]
        [HttpGet]
        [Route("addDownvote/{id}")]
         public int addDownvote(string id)
         {
            
            Voting v = new Voting();
            v.PostId = id;
            v.UserId = _userId;
            Console.WriteLine(v.UserId);
            Console.WriteLine("UID inside downvote"+_userId);
            v.Type = "downvote";
            var existingUser = votingCollection.Find(x => x.PostId == v.PostId && x.UserId == v.UserId && x.Type=="downvote").FirstOrDefault();
            if(existingUser==null)
            {
                Console.WriteLine("Didn't downvote previously");
                votingCollection.InsertOne(v);

                var filter = Builders<Thread>.Filter.Eq("Id",v.PostId);
                var update = Builders<Thread>.Update.Inc("downvote",1);

                threadCollection.UpdateOne(filter,update);
            }
            else
            {
                Console.WriteLine("upvoted previously");
                var filter = Builders<Voting>.Filter.Eq("PostId",v.PostId);
                filter &= (Builders<Voting>.Filter.Eq("UserId",v.UserId));
                votingCollection.DeleteMany(filter);

                var filter2 = Builders<Thread>.Filter.Eq("Id",v.PostId);
                var update = Builders<Thread>.Update.Inc("downvote",-1);

                threadCollection.UpdateOne(filter2,update);

            }
            
            var downvotedThread = threadCollection.Find(x=> x.Id == v.PostId).FirstOrDefault();
            var downvoteNumber = downvotedThread.Upvote;
            return downvoteNumber;
         }


         //Single Comment Add
        //[Authorize]
        [HttpPost]
        [Route("addComment/{id}")]

        public string addSingleComment([FromBody]Comment c,string id)
        {
            Console.WriteLine(id);
            Console.WriteLine("comment "+c.Op_id);
            Console.WriteLine("comment "+c.Content);
            c.Op_id = _userId;
            c.Post_id = id;
            commentCollection.InsertOne(c);
            return "Comment added successfully "+id;
        }



    }

   
}