import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CommonService {
  
  constructor(private http: HttpClient) { }
  
  addPost(payload:any): Observable<any> {
    return this.http.post('http://localhost:3000/api/posts/add-post',payload)
  }
  getPosts(id:any) :Observable<any> {
    return this.http.get(`http://localhost:3000/api/posts/all-posts/${id}`)
  }
}
