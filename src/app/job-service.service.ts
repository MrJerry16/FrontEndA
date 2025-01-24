import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface JobResponse{
  "jobid": number
  "jobTitle": string
  "jobDescription": string,
  "jobType": string,
  "jobLocation": string

}

// export interface JobResponseType{
//   status: number,
//   jobs: JobResponse[]
// }


@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  constructor(private httpclient : HttpClient) { }

  getJobLists(){
    return this.httpclient.get('http://localhost:9090/job/all');

  }
  getJobById(jobid: number) {
    return this.httpclient.get<JobResponse>(`http://localhost:9090/job/get/${jobid}`);
  }

  saveJob(inputData: object){
    return this.httpclient.post('http://localhost:9090/job/save', inputData);
  }
  updateJob(inputData: object, jobid: number) {
    return this.httpclient.put(`http://localhost:9090/job/update/${jobid}`, inputData);
  }

destroyjob(jobid:Number){
    return this.httpclient.delete(`http://localhost:9090/job/${jobid}`)

}
}
