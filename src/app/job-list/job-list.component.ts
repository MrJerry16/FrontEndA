import { Component, OnInit } from '@angular/core';
import { JobServiceService, JobResponse } from '../job-service.service';


declare var bootstrap: any;

@Component({
  selector: 'app-job-list',
  standalone: false,
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  jobs: JobResponse[] = [];
  selectedJobId: number | null = null;

  constructor(private jobservice: JobServiceService) {}

  ngOnInit(): void {
    this.getJobLists();
  }

  getJobLists(): void {
    this.jobservice.getJobLists().subscribe(
      (res: any) => {
        console.log(res);
        this.jobs = Array.isArray(res) ? res : res.jobs;
      },
      (err: any) => {
        console.error('API Error:', err);
      }
    );
  }

  confirmDelete(jobId: number): void {
    this.selectedJobId = jobId;


    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
      const modalInstance = new bootstrap.Modal(deleteModal);
      modalInstance.show();
    }
  }

  deleteConfirmed(): void {
    if (this.selectedJobId !== null) {
      this.jobservice.destroyjob(this.selectedJobId).subscribe(
        (res: any) => {
          console.log('Job deleted:', res);
          this.closeModal();
          this.showToast('Job deleted successfully!');
          this.getJobLists();
        },
        (err: any) => {
          console.error('Error deleting job:', err);
          this.closeModal();
          this.showToast('Failed to delete the job. Please try again.', true);
        }
      );
    }
  }

  closeModal(): void {
    // Close the modal explicitly using the Bootstrap modal API
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
      const modalInstance = bootstrap.Modal.getInstance(deleteModal);
      modalInstance.hide();
    }
  }

  showToast(message: string, isError: boolean = false): void {
    const toastElement = document.getElementById('deleteToast');
    if (toastElement) {
      toastElement.querySelector('.toast-body')!.textContent = message;

      // Add a class for error styling if needed
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
