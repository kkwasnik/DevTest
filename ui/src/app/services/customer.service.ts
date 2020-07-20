import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  public GetCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>('http://localhost:63235/customer');
  }

  public GetCustomer(customerId: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`http://localhost:63235/customer/${customerId}`);
  }

  public CreateCustomer(customer: Customer): Promise<Customer> {
    return this.httpClient.post<Customer>('http://localhost:63235/customer', customer).toPromise();
  }
}
