import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Job } from '@models/job';

import jobsFromFile from '@data/jobs.json';

@Injectable({
  providedIn: 'root'
})
export class JobService {

    jobs: Job[] = jobsFromFile;

    constructor() { }
  
    getAll(): Observable<Job[]> {
      return of(this.jobs);
    }
  
    get(id: number): Observable<Job> {
      return of(this.jobs).pipe(
        map(result => result.find(x => x.id === id)!)
      );
    }
  
}