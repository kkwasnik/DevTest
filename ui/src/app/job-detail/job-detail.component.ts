import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../services/job.service';
import { JobModel } from '../models/job.model';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  private jobId: number;
  public job: JobModel;
  public customerName = "Unknown";
  public customerType;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService) {
      this.jobId = route.snapshot.params.id;
      if(route.snapshot.params.customer)
        this.customerName = route.snapshot.params.customer;
      this.customerType = route.snapshot.params.type;
    }

  ngOnInit() {
    this.jobService.GetJob(this.jobId).subscribe(job => this.job = job);
  }

}
