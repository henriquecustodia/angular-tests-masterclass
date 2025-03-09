import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface MovieModel {
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  httpClient = inject(HttpClient);

  getMovies() {
    return this.httpClient.get<MovieModel[]>('http://localhost:3000/movies');
  }

  getMoviesByTitle(title: string) {
    return this.httpClient.get<MovieModel[]>(`http://localhost:3000/movies`, {
      params: { title_like: title },
    });
  }
}
