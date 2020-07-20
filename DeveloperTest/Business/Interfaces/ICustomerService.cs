using DeveloperTest.Models;

namespace DeveloperTest.Business.Interfaces
{
    public interface ICustomerService
    {
        CustomerModel[] GetCustomers();

        CustomerModel GetCustomer(int id);

        CustomerModel CreateCustomer (BaseCustomerModel customer);
    }
}
