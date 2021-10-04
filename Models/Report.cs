using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;

namespace Clique.Models
{
    public class Report
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
       public string Id { get; set; }
        [BsonElement("reported_by_id")]
       public string Reported_by_id { get; set; }
        [BsonElement("reported_to_id")]
       public string Reported_to_id { get; set; }
        [BsonElement("report_type")]
       public string Report_type { get; set; }
        [BsonElement("date")]
       public DateTime Date { get; set; } = DateTime.UtcNow;
        [BsonElement("description")]
       public string Description { get; set; }
       
    }
    
}