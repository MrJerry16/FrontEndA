import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { JobServiceService } from '../job-service.service';

declare var bootstrap: any;

@Component({
  selector: 'app-job-edit',
  standalone: false,
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {
  job: any;
  jobid: any;

  constructor(private route: ActivatedRoute, private jobService: JobServiceService ,private router: Router) {}

  ngOnInit(): void {
    // @ts-ignore
    this.jobid = +this.route.snapshot.paramMap.get('jobid');

    if (this.jobid) {
      this.jobService.getJobById(this.jobid).subscribe(
        (res) => {
          console.log(res);
          this.job = res;
        },
        (err) => {
          console.error('Error fetching job details:', err);
        }
      );
    } else {
      console.error('Job ID is null or undefined');
    }
  }

  updateJob(): void {
    if (this.jobid && this.job) {
      // Prepare input data object
      const inputData = {
        jobTitle: this.job.jobTitle,
        jobDescription: this.job.jobDescription,
        jobType: this.job.jobType,
        jobLocation: this.job.jobLocation,
      };

      console.log('Payload being sent:', inputData);

      this.jobService.updateJob(inputData, this.jobid).subscribe(
        (res: any) => {
          console.log('Job updated successfully:', res);
          this.showToast('Job updated successfully!');
          this.router.navigate(['/jobs']);
        },
        (err) => {
          console.error('Error updating job:', err);
          this.showToast('Failed to update the job. Please try again.', true);
        }
      );
    } else {
      console.error('Invalid job data or job ID');
      this.showToast('Invalid job details. Please check the inputs.', true);
    }
  }

  showToast(message: string, isError: boolean = false): void {
    const toastElement = document.getElementById('updateToast');
    if (toastElement) {
      toastElement.querySelector('.toast-body')!.textContent = message;


      if (isError) {
        toastElement.classList.add('bg-danger', 'text-light');
      } else {
        toastElement.classList.remove('bg-danger', 'text-light');
      }


      const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 2000 });
      toast.show();
    }
  }
}
