import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ContactMessage } from '@models/contact-message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {

  baseUrl = environment.webApiURL + 'contactmessages';

  constructor(private http: HttpClient) { }

  sendContactMessage(message: ContactMessage): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(`${this.baseUrl}/sendContactMessage`, message);
  }
  
}
