using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Microsoft.AspNetCore.Http;
using System;

namespace Clique.Models
{
    public class Thread
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("title")]
        [Required]
        [StringLength(50, ErrorMessage = "Must be between 5 and 50 characters", MinimumLength = 5)]
        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }
        [BsonElement("image_src")]
        public string ImageURL { get; set; }
        [BsonElement("upvote")]
        public int Upvote { get; set; }
        [BsonElement("downvote")]
        public int Downvote { get; set; }
        [BsonElement("totalvote")]
        public int TotalVote { get; set; }
        [BsonElement("op_id")]
        public string OP_id { get; set; }
        [BsonElement("op_name")]
        public string OP_name { get; set; }
        [BsonElement("comment_id")]
        public string Comment_id { get; set; }
        [BsonElement("report_count")]
        public int Report_count { get; set; }

        [BsonElement("community_id")]
        public string Community_id { get; set; }
        [BsonElement("community_name")]
        public string Community_name { get; set; }
        [BsonElement("thread_type")]
        public string Thread_type { get; set; }
        [BsonElement("created_at")]
        public DateTime Created_at { get; set; } = DateTime.UtcNow;



    }
}