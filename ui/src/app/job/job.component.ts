import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EngineerService } from '../services/engineer.service';
import { JobService } from '../services/job.service';
import { JobModel } from '../models/job.model';
import { Customer, CustomerType } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  public engineers: string[] = [];

  public jobs: JobModel[] = [];
  public customers: Customer[] = [];
  public selectedCustomer;

  public newJob: JobModel = {
    jobId: null,
    engineer: null,
    when: null,
    customerId: null
  };

  constructor(
    private engineerService: EngineerService,
    private jobService: JobService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.GetCustomers().subscribe(customers => {
      this.customers = customers
    });
    this.engineerService.GetEngineers().subscribe(engineers => this.engineers = engineers);
    this.jobService.GetJobs().subscribe(jobs => this.jobs = jobs);
  }

  getCustomer(id: number) {
    if (!id) {
      return "Unknown"
    }

    return this.customers.find(x => x.customerId === id).customer;
  }

  getRouteLink(jobId: number, customerId: number) {
    if(!jobId)
      return null;
    else if(!customerId)
      return ['/job', jobId];
    else
      return ['/job', jobId, this.getCustomer(customerId), CustomerType[this.customers.find(x => x.customerId === customerId).type]];
  }

  public createJob(form: NgForm): void {
    if (form.invalid) {
      alert('form is not valid');
    } else {
      this.newJob.customerId = this.selectedCustomer;
      this.jobService.CreateJob(this.newJob).then(() => {
        this.jobService.GetJobs().subscribe(jobs => this.jobs = jobs);
      });
    }
  }

}
