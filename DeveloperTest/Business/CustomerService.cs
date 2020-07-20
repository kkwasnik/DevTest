using System.Linq;
using DeveloperTest.Business.Interfaces;
using DeveloperTest.Database;
using DeveloperTest.Database.Models;
using DeveloperTest.Models;

namespace DeveloperTest.Business
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext context;

        public CustomerService(ApplicationDbContext context)
        {
            this.context = context;
        }

        CustomerModel[] ICustomerService.GetCustomers()
        {
            return context.Customers.Select(x => new CustomerModel
            {
                CustomerId = x.CustomerId,
                Customer = x.Name,
                Type = x.Type
            }).ToArray();
        }

        CustomerModel ICustomerService.GetCustomer(int id)
        {
            return context.Customers.Where(x => x.CustomerId == id).Select(x => new CustomerModel
            {
                CustomerId = x.CustomerId,
                Customer = x.Name,
                Type = x.Type
            }).SingleOrDefault();
        }

        CustomerModel ICustomerService.CreateCustomer(BaseCustomerModel customer)
        {
            var addedJob = context.Customers.Add(new Customer
            {
                Name = customer.Customer,
                Type = customer.Type
            });

            context.SaveChanges();

            return new CustomerModel
            {
                CustomerId = addedJob.Entity.CustomerId,
                Customer = addedJob.Entity.Name,
                Type = addedJob.Entity.Type
            };
        }
    }
}
