import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobServiceService } from '../job-service.service';
declare var bootstrap: any;

@Component({
  selector: 'app-job-create',
  standalone: false,
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent {
  job_title: any;
  job_description: any;
  job_type: any;
  jobLocation: any;

  errors: any[] = [];

  constructor(private jobservice: JobServiceService, private router: Router) {}

  saveJob() {
    const inputData = {
      JobTitle: this.job_title,
      JobDescription: this.job_description,
      JobType: this.job_type,
      JobLocation: this.jobLocation
    };

    this.jobservice.saveJob(inputData).subscribe({
      next: (res: any) => {
        console.log(res, 'response');

        this.job_title = '';
        this.job_description = '';
        this.job_type = '';
        this.jobLocation = '';

        const toastElement = document.getElementById('successToast');
        if (toastElement) {
          const toast = new bootstrap.Toast(toastElement);
          toast.show();
        }

        setTimeout(() => {
          this.router.navigate(['/jobs']);
        }, 3000);
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        console.log(err.error.errors, 'errors');
      }
    });
  }
}
