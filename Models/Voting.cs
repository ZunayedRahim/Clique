using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Clique.Models
{
    public class Voting
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("user_id")]
        public string UserId { get; set; }
        [BsonElement("post_id")]
        public string PostId { get; set; }
        [BsonElement("type")]
        public string Type { get; set; }
         [BsonElement("time")]
         public DateTime Time { get; set; } =  DateTime.UtcNow;
    }
}