import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, range, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photoServiceUrl = 'https://picsum.photos';

  constructor(private http: HttpClient) { }

  getPhotosUrls(count: number): Observable<Observable<string>[]> {
    return range(0, count).pipe(
      map(() => this.getPhotoUrl()),
      toArray()
    )
  }

  getPhotoUrl(): Observable<string> {
    return this.http.get(`${this.photoServiceUrl}/200/300`, { responseType: 'text', observe: 'response' })
      .pipe(
        delay(Math.random() * 100),
        map(response => response.url ?? '')
      );
  }
}
