import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  private apiUrl = 'http://localhost:3000/api/checkStatus';

  constructor(private http: HttpClient) { }

  getWebsites(): Observable<[]> {
    const urls = ['http://google.com', 'http://youtube.com', 'www.facebook.com']; // Remplacer par vos URL
    return this.http.post<[]>('http://localhost:3000/api/checkStatus', { urls: urls });
  }

}
