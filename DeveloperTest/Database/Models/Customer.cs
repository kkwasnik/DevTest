using System.Collections.Generic;
using DeveloperTest.Models;

namespace DeveloperTest.Database.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }

        public string Name { get; set; }

        public CustomerType Type { get; set; }

        public virtual ICollection<Job> Jobs { get; set; }
    }
}
