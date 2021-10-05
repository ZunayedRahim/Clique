using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Clique.Models
{
    public class Comment
    {
         [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
       public string Id { get; set; }
        [BsonElement("op_id")]
       public string Op_id { get; set; }
        [BsonElement("content")]
       public string Content { get; set; }
        [BsonElement("post_id")]
       public string Post_id { get; set; }
        [BsonElement("upvote")]
       public int Upvote { get; set; }
       [BsonElement("downvote")]
       public int Downvote { get; set; }
       [BsonElement("totalvote")]
       public int Totalvote { get; set; }
        [BsonElement("report_no")]
       public int Report_no { get; set; }

        [BsonElement("op_name")]
       public string Op_name { get; set; }
    }
}