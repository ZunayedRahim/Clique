using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Clique.Models
{
    public class Report
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
       public string Id { get; set; }
        [BsonElement("reported_by_id")]
       public string Reported_by { get; set; }
        [BsonElement("reported_to_id")]
       public string Reported_id { get; set; }
        [BsonElement("report_type")]
       public string Report_type { get; set; }
        [BsonElement("date")]
       public string Date { get; set; }
        [BsonElement("description")]
       public string DescriptionOfReport { get; set; }
       
    }
    
}