import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { County } from '@models/county.model';

@Injectable({
  providedIn: 'root'
})
export class CountyService {

  baseUrl = environment.webApiURL + 'counties';

  constructor(private http: HttpClient) { }

  getAll(cityId: string): Observable<County[]> {
    const params = new HttpParams().set('cityId', cityId);
    return this.http.get<County[]>(this.baseUrl, { params });
  }

  get(id: string): Observable<County> {
    return this.http.get<County>(`${this.baseUrl}/GetCounty/${id}`);
  }

}
