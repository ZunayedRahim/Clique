using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
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
       public string Name { get; set; }
         [BsonElement("description")]
       public string Description { get; set; }
        [BsonElement("created_on")]
       public DateTime  Created_on { get; set; } = DateTime.UtcNow;
        [BsonElement("creator_id")]
       public string Creator_id { get; set; }
        [BsonElement("moderator_id")]
       public string Moderator_id { get; set; }
        [BsonElement("member_no")]
       public int Member_no { get; set; }
       [BsonElement("coverPhoto")]
        public IFormFile CoverPhoto { get; set; }

         [BsonElement("image_url")]
       public string Image_Url { get; set; }

        [BsonElement("category")]
       public string Category { get; set; }
    }
}