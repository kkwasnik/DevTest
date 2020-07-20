import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer, CustomerType } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  private customerId: number;

  public customer: Customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService) {
    this.customerId = route.snapshot.params.id;
  }

  getTypeName(value: number) {
    return CustomerType[value]
  }

  ngOnInit() {
    this.customerService.GetCustomer(this.customerId).subscribe(cust => this.customer = cust);
  }

}
