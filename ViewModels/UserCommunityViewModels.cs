using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Clique.ViewModels
{
    public class UserCommunityViewModels
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; }

        [BsonElement("user_id")]
        public string User_id { get; set; }

        
        [BsonElement("community_id")]
        public string Community_id { get; set; }

        
        [BsonElement("community_type")]
        public string Community_type { get; set; }
    }
}