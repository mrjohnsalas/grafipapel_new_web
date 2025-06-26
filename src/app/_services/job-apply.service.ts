import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Job } from '@models/job';

import jobsFromFile from '@data/jobs.json';
import { JobApply } from '@models/job-apply.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobApplyService {

  baseUrl = environment.webApiURL + 'jobapplies';

  jobs: Job[] = jobsFromFile;

  constructor(private http: HttpClient) { }

  apply(jobApply: JobApply): Observable<JobApply> {

    const objFormData = new FormData();
    objFormData.append('JobId', jobApply.jobId.toString());
    objFormData.append('JobTitle', jobApply.jobTitle);
    objFormData.append('DNI', jobApply.dni);
    objFormData.append('FirstName', jobApply.firstName);
    objFormData.append('LastName', jobApply.lastName);
    objFormData.append('Phone', jobApply.phone);
    objFormData.append('Email', jobApply.email);
    objFormData.append('CvFile', jobApply.cvFile);

    return this.http.post<JobApply>(this.baseUrl, objFormData);
  }
}