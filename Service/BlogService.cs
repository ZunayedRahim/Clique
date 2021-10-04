using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Clique.Models;
using Clique.ViewModels;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using Clique.Helpers;

namespace Clique.Service
{

    public interface IBlogService
    {
        Payload Create(User user);
        Payload Login(UserViewModels user);
        User GetById(string id);

        Task<Thread> GetPostById(string id);
        Task<Payload> UploadImage(IFormFile file);
        List<Community> GetCommunitiesByCategory(string category);
        Task<Payload> CreateCommunity(Community community);

    }
    public class BlogService : IBlogService
    {
        private readonly IMongoCollection<User> _userCollection;

        private readonly IMongoCollection<Community> _communityCollection;

        private readonly IMongoCollection<Thread> _threadCollection;

        private readonly string _secretKey;
        private readonly int _tokenExpiryTime;
        private readonly string _uploadCareSecret;
        private readonly string _uploadCarePubKey;
        private readonly int _uploadCareExpiry;

         public BlogService(IMongoClient client,IConfiguration config)
        {
            var db = client.GetDatabase("clique");
            _userCollection = db.GetCollection<User>("user");

            _communityCollection = db.GetCollection<Community>("community");

            _threadCollection = db.GetCollection<Thread>("thread");

            _secretKey = config["JWT:Secret"];
            _tokenExpiryTime = Int32.Parse(config["JWT:ExpiresIn"]);
            _uploadCarePubKey = config["UploadCare:PubKey"];
            _uploadCareSecret = config["UploadCare:Secret"];
            _uploadCareExpiry = int.Parse(config["UploadCare:Expiry"]);
           
        }

        public Payload Create(User user)
        {
            var existingUser = _userCollection.Find(x => x.Email == user.Email).FirstOrDefault();
            if(existingUser != null)
            {
                Console.WriteLine("User with the email already exist");
                return new Payload {StatusCode = 404, StatusDescription = "User with the email already exist."};

            }

            else
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt(12));
                user.ConfirmPassword = BCrypt.Net.BCrypt.HashPassword(user.ConfirmPassword, BCrypt.Net.BCrypt.GenerateSalt(12));
                _userCollection.InsertOne(user);

                return new Payload {StatusCode = 200, StatusDescription = "User created successfully"};
            }
            throw new System.NotImplementedException();
        }

        public Payload Login(UserViewModels userVm)
        {
            var user = _userCollection.Find(x => x.Email == userVm.Email).FirstOrDefault();
            if(user == null)
            {
                Console.WriteLine(userVm.Email + " doesnt exist");
                return new Payload {StatusCode = 404, StatusDescription = "User doesn't exist."};

            }
            else{
                bool isPasswordVerified = BCrypt.Net.BCrypt.Verify(userVm.Password, user.Password);
                if(!isPasswordVerified)
                {
                    Console.WriteLine("Password is Incorrect");
                    return  new Payload {  StatusCode = 400, StatusDescription = "Password is incorrect. Did you forget your password?" };

                }
                else{
                    string token = Util.GenerateToken(user, _secretKey, "User", _tokenExpiryTime);

                    return new Payload
                    {
                        StatusCode = 200,
                        StatusDescription = token,
                    };
                }
            }
        }

           public User GetById(string id)
        {
            return _userCollection.Find(x => x.Id == id).FirstOrDefault();
        }



         async public Task<Payload> CreateCommunity(Community community)
        {
            try
            {
                Console.WriteLine(community.CoverPhoto);
                Console.WriteLine( "Name " +community.Name);
                Console.WriteLine( "Mod id " +community.Moderator_id);
                Console.WriteLine( "mem " +community.Member_no);
                // upload the image to the cloud bucket and then store the url
                var res = await UploadImage(community.CoverPhoto);
                
                if (res == null)
                {
                    return new Payload { StatusCode = 400, StatusDescription = "Couldn't upload image" };
                }

                community.Image_Url = res.StatusDescription;
                // setting the file field to null as we won't be saving the file directly in the database
                community.CoverPhoto = null;

                // insert the post into database
                await _communityCollection.InsertOneAsync(community);
                return new Payload { StatusCode = 200, StatusDescription = "Community created successfully." };

        async public Task<Thread> GetPostById(string id)
        {
            try
            {
                var filter = Builders<Thread>.Filter.Eq("Id", id);
                var projection = Builders<Thread>.Projection.
                    Include("title").
                    Include("description").
                    Include("image_src").
                    Include("upvote").
                    Include("downvote").
                    Include("totalvote").
                    Include("op_id").
                    Include("op_name").
                    Include("comment_id").
                    Include("report_count");
                Console.WriteLine("blogservice");
                var result = await _threadCollection.Find(filter).Project(projection).FirstOrDefaultAsync();
                Thread thread = BsonSerializer.Deserialize<Thread>(result);
                // find the user name from the post author id
                var user = await _userCollection.Find(x => x.Id == thread.OP_id).FirstOrDefaultAsync();
                Console.WriteLine("blogservice");
                if (user == null)
                {
                    return null;
                }
                thread.OP_name = user.Username;
                
                return thread;


            }
            catch (Exception e)
            {
                Console.WriteLine(e);

                return new Payload { StatusCode = 400, StatusDescription = e.Message };
            }

        }


                return null;
            }


        public async Task<Payload> UploadImage(IFormFile file)
        {
            string URL = $"https://upload.uploadcare.com/base/";
            HttpClient client = new HttpClient();

            // the following headers are required for the uploadcare API
            KeyValuePair<string, string> keys = Util.GenerateSignature(_uploadCareSecret, _uploadCareExpiry);

            MultipartFormDataContent form = new MultipartFormDataContent();
            // convert file to byte array
            byte[] data;
            using (var br = new BinaryReader(file.OpenReadStream()))
                data = br.ReadBytes((int)file.OpenReadStream().Length);

            ByteArrayContent bytes = new ByteArrayContent(data);
            form.Add(new StringContent(keys.Key), "expire");
            form.Add(new StringContent(keys.Value), "signature");
            form.Add(new StringContent(_uploadCarePubKey), "UPLOADCARE_PUB_KEY");
            form.Add(new StringContent("1"), "UPLOADCARE_STORE");
            form.Add(bytes, "file", file.FileName);

            HttpResponseMessage response = await client.PostAsync(URL, form);
            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Image uploaded successfully");
                var jo = JObject.Parse(response.Content.ReadAsStringAsync().Result);
                var fileUrl = jo["file"].ToString();
                Console.WriteLine(fileUrl);

                return new Payload { StatusCode = 200, StatusDescription = $"https://ucarecdn.com/{fileUrl}/" };

            }
            return null;
        }
        public List<Community> GetCommunitiesByCategory(string category)
        {
            try
            {
                var filter = Builders<Community>.Filter.Eq("category", category);
                var projection = Builders<Community>.Projection.
                    Include("name").
                    Include("description").
                    Include("category").
                    Include("image_url");

                var communityList = _communityCollection.Find(filter).Project(projection).ToList();
                List<Community> communities = new List<Community>();
                foreach (var community in communityList)
                    communities.Add(BsonSerializer.Deserialize<Community>(community));

                return communities;
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }

        }
    }
}