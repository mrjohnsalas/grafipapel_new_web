import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { State } from '@models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  baseUrl = environment.webApiURL + 'states';

  constructor(private http: HttpClient) { }

  getAll(): Observable<State[]> {
    return this.http.get<State[]>(this.baseUrl);
  }

  get(countryId: string, id: number): Observable<State> {
    return this.http.get<State>(`${this.baseUrl}/${countryId}/${id}`);
  }

  getByName(countryId: string, name: string): Observable<State> {
    return this.http.get<State>(`${this.baseUrl}/GetStateByName/${countryId}/${name}`);
  }

  getAllByCountryId(countryId: string): Observable<State[]> {
    return this.http.get<State[]>(`${this.baseUrl}/GetStatesByCountryId/${countryId}`);
  }

}
