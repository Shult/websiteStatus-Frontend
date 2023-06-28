import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './website';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  constructor(private http: HttpClient) { }

  checkWebsites(urls: string[]): Observable<ApiResponse> {
    let validURL: any[] = [];  // Initialize array

    let urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?'+ // port
      '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
      '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    urls.forEach(url => {
      //console.log(url);
      url = url.trim();  // Removes blank spaces and carriage return characters
      if(urlPattern.test(url)) {
        //console.log(url + " is a correct URL");
        validURL.push(url);  // Add URL to array if valid
      } else {
        console.log(url + " is not a correct URL");
      }
    });

    let jsonObject = { "urls": validURL };
    console.log(jsonObject);

    return this.http.post<ApiResponse>('http://localhost:3000/api/checkStatus', jsonObject);
  }
}
