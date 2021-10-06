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

        private IMongoCollection<Report> reportCollection;

        private IMongoCollection<Community> communityCollection;
        private readonly string _userId;
        private readonly IBlogService _blogService;
        public ThreadController(IMongoClient client, IBlogService _blogService)
        {
            var database = client.GetDatabase("clique");
            threadCollection = database.GetCollection<Thread>("thread");

            userCollection = database.GetCollection<User>("user");
            votingCollection = database.GetCollection<Voting>("vote");
            commentCollection = database.GetCollection<Comment>("comment");
            reportCollection = database.GetCollection<Report>("report");
            communityCollection = database.GetCollection<Community>("community");
            this._blogService = _blogService;
            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
            _userId = (string)_httpContextAccessor.HttpContext.Items["UserId"];
        }

        //View all public threads
        [HttpGet]

        public IEnumerable<Thread> Get()
        {

            Console.WriteLine("uid:" + _userId);
            var publicThread = threadCollection.Find(s => s.Thread_type == "public").ToList();
            return publicThread;
        }

        //View all public & private threads
        [Authorize]
        [HttpGet]
        [Route("privatethread")]
        public IEnumerable<Thread> GetPrivateThread()
        {

            Console.WriteLine("uid:" + _userId);
            var privateThread = threadCollection.Find(s => s.Thread_type == "public" || s.Thread_type == "private").ToList();
            return privateThread;
        }

        //Create a new Thread
        [Authorize]
        [HttpPost]
        [Route("add/{id}")] // id = community id
        public string post([FromBody]Thread t, string id)
        {
            t.OP_id = _userId;
            Console.WriteLine("model " + t.OP_id);

            var user = userCollection.Find(x => x.Id == _userId).FirstOrDefault();
            t.OP_name = user.Username;

            var community = communityCollection.Find(x=>x.Id == id).FirstOrDefault();

            t.Community_id = id;
            t.Community_name = community.Name;
            t.Thread_type = "public";

            threadCollection.InsertOne(t);
            return "Thank you for posting a new thread";
        }

        //Get inside a thread
        // GET /[thread]/:id
        [HttpGet]
        [Route("{id}")]
        async public Task<ActionResult> GetPostById(string id)
        {

            Console.WriteLine("post id: " + id);

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
            Console.WriteLine("UID inside upvote" + _userId);
            v.Type = "upvote";
            var existingUser = votingCollection.Find(x => x.PostId == v.PostId && x.UserId == v.UserId && x.Type == "upvote").FirstOrDefault();
            if (existingUser == null)
            {
                Console.WriteLine("Didn't upvote previously");
                votingCollection.InsertOne(v);

                var filter = Builders<Thread>.Filter.Eq("Id", v.PostId);
                var update = Builders<Thread>.Update.Inc("upvote", 1);

                threadCollection.UpdateOne(filter, update);
            }
            else
            {
                Console.WriteLine("upvoted previously");
                var filter = Builders<Voting>.Filter.Eq("PostId", v.PostId);
                filter &= (Builders<Voting>.Filter.Eq("UserId", v.UserId));
                votingCollection.DeleteMany(filter);

                var filter2 = Builders<Thread>.Filter.Eq("Id", v.PostId);
                var update = Builders<Thread>.Update.Inc("upvote", -1);

                threadCollection.UpdateOne(filter2, update);

            }

            var upvotedThread = threadCollection.Find(x => x.Id == v.PostId).FirstOrDefault();
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
            Console.WriteLine("UID inside downvote" + _userId);
            v.Type = "downvote";
            var existingUser = votingCollection.Find(x => x.PostId == v.PostId && x.UserId == v.UserId && x.Type == "downvote").FirstOrDefault();
            if (existingUser == null)
            {
                Console.WriteLine("Didn't downvote previously");
                votingCollection.InsertOne(v);

                var filter = Builders<Thread>.Filter.Eq("Id", v.PostId);
                var update = Builders<Thread>.Update.Inc("downvote", 1);

                threadCollection.UpdateOne(filter, update);
            }
            else
            {
                Console.WriteLine("upvoted previously");
                var filter = Builders<Voting>.Filter.Eq("PostId", v.PostId);
                filter &= (Builders<Voting>.Filter.Eq("UserId", v.UserId));
                votingCollection.DeleteMany(filter);

                var filter2 = Builders<Thread>.Filter.Eq("Id", v.PostId);
                var update = Builders<Thread>.Update.Inc("downvote", -1);

                threadCollection.UpdateOne(filter2, update);

            }

            var downvotedThread = threadCollection.Find(x => x.Id == v.PostId).FirstOrDefault();
            var downvoteNumber = downvotedThread.Upvote;
            return downvoteNumber;
        }


        //Single Comment Add
         [Authorize]
        [HttpPost]
        [Route("addComment/{id}")]

        public string addSingleComment([FromBody] Comment c, string id)
        {
            Console.WriteLine( "inside add single comment" );
            Console.WriteLine(id);
            Console.WriteLine("comment " + c.Op_id);
            Console.WriteLine("comment " + c.Content);
            var user = userCollection.Find(x => x.Id == _userId).FirstOrDefault();
            c.Op_name = user.Username;

            c.Op_id = _userId;
            c.Post_id = id;

            commentCollection.InsertOne(c);
            return "Comment added successfully " + id;
        }


        //All comments view
        
        [HttpGet]
        [Route("getAllComments/{id}")] // id = thread id
        public IEnumerable<Comment> GetAllComments(string id)
        {
            var allComments = commentCollection.Find(x => x.Post_id == id).ToList();

            return allComments;
        }

        //Single Comment Upvote
        [Authorize]
        [HttpGet]
        [Route("addUpvoteComment/{id}")]
        public int AddUpvoteComment(string id)
        {

            Voting v = new Voting();
            v.PostId = id;
            v.UserId = _userId;
            Console.WriteLine(v.UserId);
            Console.WriteLine("UID inside upvote" + _userId);
            v.Type = "upvote";
            var existingUser = votingCollection.Find(x => x.PostId == v.PostId && x.UserId == v.UserId && x.Type == "upvote").FirstOrDefault();
            if (existingUser == null)
            {
                Console.WriteLine("Didn't upvote previously");
                votingCollection.InsertOne(v);

                var filter = Builders<Comment>.Filter.Eq("Id", v.PostId);
                var update = Builders<Comment>.Update.Inc("upvote", 1);

                commentCollection.UpdateOne(filter, update);
            }
            else
            {
                Console.WriteLine("upvoted previously");
                var filter = Builders<Voting>.Filter.Eq("PostId", v.PostId);
                filter &= (Builders<Voting>.Filter.Eq("UserId", v.UserId));
                votingCollection.DeleteMany(filter);

                var filter2 = Builders<Comment>.Filter.Eq("Id", v.PostId);
                var update = Builders<Comment>.Update.Inc("upvote", -1);

                commentCollection.UpdateOne(filter2, update);

            }

            var upvotedComment = commentCollection.Find(x => x.Id == v.PostId).FirstOrDefault();
            var upvoteNumber = upvotedComment.Upvote;
            return upvoteNumber;
        }


        //Single Comment Downvote
        //[Authorize]
        [HttpGet]
        [Route("addDownvoteComment/{id}")]
        public int AddDownvoteComment(string id)
        {

            Voting v = new Voting();
            v.PostId = id;
            v.UserId = _userId;
            Console.WriteLine(v.UserId);
            Console.WriteLine("UID inside downvote" + _userId);
            v.Type = "downvote";
            var existingUser = votingCollection.Find(x => x.PostId == v.PostId && x.UserId == v.UserId && x.Type == "downvote").FirstOrDefault();
            if (existingUser == null)
            {
                Console.WriteLine("Didn't downvote previously");
                votingCollection.InsertOne(v);

                var filter = Builders<Comment>.Filter.Eq("Id", v.PostId);
                var update = Builders<Comment>.Update.Inc("downvote", 1);

                commentCollection.UpdateOne(filter, update);
            }
            else
            {
                Console.WriteLine("upvoted previously");
                var filter = Builders<Voting>.Filter.Eq("PostId", v.PostId);
                filter &= (Builders<Voting>.Filter.Eq("UserId", v.UserId));
                votingCollection.DeleteMany(filter);

                var filter2 = Builders<Comment>.Filter.Eq("Id", v.PostId);
                var update = Builders<Comment>.Update.Inc("downvote", -1);

                commentCollection.UpdateOne(filter2, update);

            }

            var downvotedComment = commentCollection.Find(x => x.Id == v.PostId).FirstOrDefault();
            var downvoteNumber = downvotedComment.Upvote;
            return downvoteNumber;
        }

        //Create a reply to a comment
        [HttpPost]
        [Route("createReply/{id}")] //id = comment id
        public string CreateCommentReply([FromBody] Comment reply, string id)
        {
            reply.Op_id = _userId;
            reply.Post_id = id;

            commentCollection.InsertOne(reply);
            return "Created reply successfully" + id;
        }

        //Get all reply to a comment

        [HttpGet]
        [Route("getReply/{id}")] // id = main comment's id
        public List<Comment> GetCommentReply(string id)
        {
            var allReply = commentCollection.Find(x => x.Id == id).ToList();
            return allReply;
        }

        //Single Reply Upvote
        [Authorize]
        [HttpGet]
        [Route("addUpvoteReply/{id}")] // id = commentId
        public int AddUpvoteReply(string id)
        {

            Voting v = new Voting();
            v.PostId = id;
            v.UserId = _userId;
            Console.WriteLine(v.UserId);
            Console.WriteLine("UID inside upvote reply" + _userId);
            v.Type = "upvote";
            var existingUser = votingCollection.Find(x => x.PostId == v.PostId && x.UserId == v.UserId && x.Type == "upvote").FirstOrDefault();
            if (existingUser == null)
            {
                Console.WriteLine("Didn't upvote previously");
                votingCollection.InsertOne(v);

                var filter = Builders<Comment>.Filter.Eq("Id", v.PostId);
                var update = Builders<Comment>.Update.Inc("upvote", 1);

                commentCollection.UpdateOne(filter, update);
            }
            else
            {
                Console.WriteLine("upvoted previously");
                var filter = Builders<Voting>.Filter.Eq("PostId", v.PostId);
                filter &= (Builders<Voting>.Filter.Eq("UserId", v.UserId));
                votingCollection.DeleteMany(filter);

                var filter2 = Builders<Comment>.Filter.Eq("Id", v.PostId);
                var update = Builders<Comment>.Update.Inc("upvote", -1);

                commentCollection.UpdateOne(filter2, update);

            }

            var upvotedComment = commentCollection.Find(x => x.Id == v.PostId).FirstOrDefault();
            var upvoteNumber = upvotedComment.Upvote;
            return upvoteNumber;
        }


        //Single Reply Downvote
        //[Authorize]
        [HttpGet]
        [Route("addDownvoteReply/{id}")]    // id = commentId
        public int AddDownvoteReply(string id)
        {

            Voting v = new Voting();
            v.PostId = id;
            v.UserId = _userId;
            Console.WriteLine(v.UserId);
            Console.WriteLine("UID inside downvote reply" + _userId);
            v.Type = "downvote";
            var existingUser = votingCollection.Find(x => x.PostId == v.PostId && x.UserId == v.UserId && x.Type == "downvote").FirstOrDefault();
            if (existingUser == null)
            {
                Console.WriteLine("Didn't downvote reply previously");
                votingCollection.InsertOne(v);

                var filter = Builders<Comment>.Filter.Eq("Id", v.PostId);
                var update = Builders<Comment>.Update.Inc("downvote", 1);

                commentCollection.UpdateOne(filter, update);
            }
            else
            {
                Console.WriteLine("upvoted previously");
                var filter = Builders<Voting>.Filter.Eq("PostId", v.PostId);
                filter &= (Builders<Voting>.Filter.Eq("UserId", v.UserId));
                votingCollection.DeleteMany(filter);

                var filter2 = Builders<Comment>.Filter.Eq("Id", v.PostId);
                var update = Builders<Comment>.Update.Inc("downvote", -1);

                commentCollection.UpdateOne(filter2, update);

            }

            var downvotedComment = commentCollection.Find(x => x.Id == v.PostId).FirstOrDefault();
            var downvoteNumber = downvotedComment.Downvote;
            return downvoteNumber;
        }
        //Report thread
        // [Authorize]
        [HttpPost]
        [Route("reportThread/{id}")] // id = thread id

        public string ReportThread([FromBody] Report report, string id)
        {

            var existingUser = reportCollection.Find(x => x.Reported_by_id == _userId && x.Reported_to_id == id).FirstOrDefault();
            if (existingUser == null)
            {
                Console.WriteLine("Didn't Report Previously");

                report.Reported_by_id = _userId;
                report.Reported_to_id = id;
                reportCollection.InsertOne(report);
                var filter = Builders<Thread>.Filter.Eq("Id", id);
                var update = Builders<Thread>.Update.Inc("report_count", 1);
                threadCollection.UpdateOne(filter, update);

                return "Reported Successfully";
            }
            return "Previously Reported";
        }

        //Sorting Front Page 
        
        //Trending : top voted threads last day

        
        //New : latest threads

        [Authorize]
        [HttpGet]
        [Route("privatethreadByNew")]
        public IEnumerable<Thread> GetPrivateThreadByNew()
        {

            Console.WriteLine("uid:" + _userId);
            // var threadTop = threadCollection.Find(s => true).SetSortOrder(SortBy.Descending("upvote"));

            var sort = Builders<Thread>.Sort.Descending("created_at");
            var threadTop = threadCollection.Find(s=>s.Thread_type == "private" || s.Thread_type=="public").Sort(sort).ToList();

            return threadTop;
        }


        //Top : top voted threads
         //View all private threads
        [Authorize]
        [HttpGet]
        [Route("privatethreadByTop")]
        public IEnumerable<Thread> GetPrivateThreadByTop()
        {

            Console.WriteLine("uid:" + _userId);
            // var threadTop = threadCollection.Find(s => true).SetSortOrder(SortBy.Descending("upvote"));

            var sort = Builders<Thread>.Sort.Descending("upvote");
            var threadTop = threadCollection.Find(s=>s.Thread_type == "private" || s.Thread_type=="public").Sort(sort).ToList();

            return threadTop;
        }

        //Searching Threads
        [HttpGet]
        [Route("searchThread/{id}")]
        public IEnumerable<Thread> GetThreadsBySearch(string id)
        {
            Console.WriteLine("Search string: "+id);

           

            return threadCollection.Find(x=>x.Title == id).ToList();
        }



    }


}