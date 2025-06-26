import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Job } from '@models/job';

import jobsFromFile from '@data/jobs.json';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl = environment.webApiURL + 'jobs';

  jobs: Job[] = jobsFromFile;

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Job[]> {
    return of(this.jobs);
  }
  
  get(id: number): Observable<Job> {
    return of(this.jobs).pipe(
      map(result => result.find(x => x.id === id)!)
    );
  }
}