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
    }
    public class BlogService : IBlogService
    {
        private readonly IMongoCollection<User> _userCollection;
        private readonly string _secretKey;
        private readonly int _tokenExpiryTime;

     

         public BlogService(IMongoClient client,IConfiguration config)
        {
            var db = client.GetDatabase("clique");
            _userCollection = db.GetCollection<User>("user");
            _secretKey = config["JWT:Secret"];
            _tokenExpiryTime = Int32.Parse(config["JWT:ExpiresIn"]);

           
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
    }
}