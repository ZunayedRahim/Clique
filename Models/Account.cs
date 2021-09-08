using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Clique.Models
{
    public class Account
    {
          [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
       public string Id { get; set; }
        [BsonElement("user_id")]
       public string User_id { get; set; }
        [BsonElement("username")]
       public string Username { get; set; }
        [BsonElement("first_name")]
       public string First_name { get; set; }

       [BsonElement("last_name")]
       public string Last_name { get; set; }

       [BsonElement("dateofbirth")]
       public string Dateofbirth { get; set; }


       [BsonElement("moderatorUrl")]
       public string ModeratorUrl { get; set; }


       [BsonElement("communities_id")]
       public string Communities_id { get; set; }

       [BsonElement("points")]
       public int Points { get; set; }
    }
}