using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Clique.Models
{
    public class Community
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
       public string Id { get; set; }
        [BsonElement("name")]
       public string Community_name { get; set; }
        [BsonElement("created_on")]
       public string Created_on { get; set; }
        [BsonElement("creator_id")]
       public string Creator_id { get; set; }
        [BsonElement("Moderator_id")]
       public string Moderator_id { get; set; }
        [BsonElement("member_no")]
       public int Member_no { get; set; }
    }
}