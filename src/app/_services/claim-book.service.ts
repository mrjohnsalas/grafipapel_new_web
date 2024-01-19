import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ClaimBook } from '@models/claim-book.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimBookService {

  baseUrl = environment.webApiURL + 'claimbooks';

  constructor(private http: HttpClient) { }

  create(obj: ClaimBook): Observable<ClaimBook> {
    return this.http.post<ClaimBook>(this.baseUrl, obj);
  }
  
}
