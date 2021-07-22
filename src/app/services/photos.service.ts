import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from '../models/photos';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  baseUrl = environment.baseurl;
  apiKey = environment.apiKey;
  public photos = new BehaviorSubject<Photo[]>([]);
  public photos$ = this.photos.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  searchPhotos(tag: string): Observable<any>{
    const params = new HttpParams().append("tags", tag).append('format', 'json').append('nojsoncallback', '1').append('per_page', '1');
    return this.http.get(`${this.baseUrl}&api_key=${this.apiKey}`, { params: params })
  }

  searchAllTagPhotos(tag: string): Observable<any>{
    const params = new HttpParams().append("tags", tag).append('format', 'json').append('nojsoncallback', '1').append('per_page', '10');
    return this.http.get(`${this.baseUrl}&api_key=${this.apiKey}`, { params: params })
  }

}
