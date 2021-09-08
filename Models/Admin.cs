using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Clique.Models
{
    public class Admin
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
       public string Id { get; set; }
        [BsonElement("user_id")]
       public string Admin_userid { get; set; }
        [BsonElement("username")]
       public string Admin_username { get; set; }
        [BsonElement("password")]
       public string Admin_password { get; set; }
    }
}