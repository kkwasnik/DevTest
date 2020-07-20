using System;
using Microsoft.EntityFrameworkCore;
using DeveloperTest.Database.Models;
using DeveloperTest.Models;

namespace DeveloperTest.Database
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Customer> Customers { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Job>()
                .HasIndex(x => x.JobId).IsUnique();
        
            modelBuilder.Entity<Customer>()
                .HasIndex(x => x.CustomerId).IsUnique();

            modelBuilder.Entity<Job>()
                .Property(x => x.JobId)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Customer>()
                .Property(x => x.CustomerId)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Job>()
                .HasData(new Job
                {
                    JobId = 1,
                    Engineer = "Test",
                    When = DateTime.Now
                });

            modelBuilder.Entity<Customer>()
                .HasData(new Customer
                {
                    CustomerId = 1,
                    Name = "CustomerKK",
                    Type = CustomerType.Large
                });
        }
    }
}
