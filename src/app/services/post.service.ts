import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../models/environment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url: string = this.environment.paths.POSTS;

  constructor(private http: HttpClient, private environment: Environment) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  getOnePost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
  }
}
