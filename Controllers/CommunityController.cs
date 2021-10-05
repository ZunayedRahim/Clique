using Clique.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Clique.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Clique.ViewModels;

namespace Clique.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommunityController : Controller
    {
        private IMongoCollection<Community> communityCollection;

        private IMongoCollection<UserCommunityViewModels> userCommunityCollection;
         private readonly IBlogService _blogService;

         public readonly string _userId;
        public CommunityController(IMongoClient client, IBlogService _userService)
        {
            var database = client.GetDatabase("clique");
            communityCollection = database.GetCollection<Community>("community");
            userCommunityCollection = database.GetCollection<UserCommunityViewModels>("user_community");
            this._blogService = _userService;

            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
            _userId = (string)_httpContextAccessor.HttpContext.Items["UserId"];
        }

        [HttpGet]
        
        public IEnumerable<Community> Get()
        {  
            return communityCollection.Find(s=>true).ToList();
        }
        [Authorize]
        [HttpPost]
        [Route("add")]
        // public string post(Community c)
        // {
        //     Console.WriteLine(c.Community_name);
        //     communityCollection.InsertOne(c);
        //     return "Thank you for creating a new community";
        // }
        async public Task<ActionResult> Create([FromForm] Community community)
        {
            Console.WriteLine( "cover " +community.CoverPhoto);
            Console.WriteLine( "mem " +community.Member_no);
            community.Creator_id = _userId;
            community.Moderator_id = _userId;
            Payload res = await _blogService.CreateCommunity(community);
            if (res.StatusCode != 200)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, res.StatusDescription));
            }
            return Ok(res);
        }

        [HttpGet]
        [Route("public")]
        public ActionResult GetCommunityByCategory()
        {
            // if(_userId==null)
            // {
            //         communityCollection.Find(s=>s.Category== "public" ).ToList();
            // }

            List<Community> communities = _blogService.GetCommunitiesByCategory("public");
            if (communities == null)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, "Something is wrong"));
            }
            return Ok(communities);
        }


        
        // GET /[community]/:id
        [HttpGet]
        [Route("{id}")]
        async public Task<ActionResult> GetCommunityById(string id)
        {

            Console.WriteLine("community id: " + id);

            Community community = await _blogService.GetCommunityById(id);
            Console.WriteLine("here");

            if (community == null)
            {
                return new BadRequestObjectResult(new ErrorResult("Internal Server Error", 400, "Something is wrong"));
            }
            return Ok(community);
        }


        //Gets the community list a user already joined
        [Authorize]
        [HttpGet]
        [Route("communityList")]

        public IEnumerable<UserCommunityViewModels> GetCommunityList()
        {

            var communityList = userCommunityCollection.Find(x=>x.User_id==_userId).ToList();

            return communityList;
        }

        //join a community
        [Authorize]
        [HttpPost]
        [Route("joinCommunity")]

        public string JoinCommunity(UserCommunityViewModels user_community)
        {
            user_community.User_id = _userId;
            
            userCommunityCollection.InsertOne(user_community);
            return "Joined successfully";
        }

        //unfollow a community
        [Authorize]
        [HttpPost]
        [Route("leaveCommunity/{id}")]  // id = community id

        public string LeaveCommunity(string id)
        {
            var filter = Builders<UserCommunityViewModels>.Filter.Eq("User_id",_userId);
            filter &= (Builders<UserCommunityViewModels>.Filter.Eq("Community_id",id));
            userCommunityCollection.DeleteMany(filter);

            return "Left community successfully";
        }

        



    }

   
}