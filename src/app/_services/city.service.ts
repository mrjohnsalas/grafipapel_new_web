import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { City } from '@models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseUrl = environment.webApiURL + 'cities';

  constructor(private http: HttpClient) { }

  getAll(stateId: string): Observable<City[]> {
    const params = new HttpParams().set('stateId', stateId);
    return this.http.get<City[]>(this.baseUrl, { params });
  }

  get(id: string): Observable<City> {
    return this.http.get<City>(`${this.baseUrl}/GetCity/${id}`);
  }

}
