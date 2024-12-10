import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoveltyService {

  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http:HttpClient) {}

  createNovelty(novelty: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createNovelty/`, novelty);
  }

  listNovelty(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listNovelties/`);
  }
  deleteNovelty(noveltyId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteNovelty/${noveltyId}`);
  }
}

