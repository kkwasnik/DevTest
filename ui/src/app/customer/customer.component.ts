import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Customer, CustomerType } from '../models/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customers: Customer[] = [];
  public selectedType: number;
  public customerName: string;
  public types = CustomerType;
  public customerTypesKeys;

  constructor(
    private customerService: CustomerService) {
      this.customerTypesKeys = Object.keys(this.types).filter(k => !isNaN(Number(k)));
  }

  ngOnInit() {
    this.customerService.GetCustomers().subscribe(customers => this.customers = customers);
  }

  getTypeName(value: number) {
    return CustomerType[value]
  }

  public createNewCustomer(form: NgForm): void {
    if (form.invalid) {
      alert('form is not valid');
    } else {
      var customer: Customer = {
        customerId: null,
        customer: this.customerName,
        type: Number(this.selectedType)
      };

      this.customerService.CreateCustomer(customer).then(() => {
        this.customerService.GetCustomers().subscribe(customers => {
          this.customers = customers
        });
      });
    }
  }

}
