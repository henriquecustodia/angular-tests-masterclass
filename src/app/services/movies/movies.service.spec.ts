import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MovieModel, MoviesService } from './movies.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(MoviesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('deve retornar uma lista de filmes', fakeAsync(() => {
    let result: MovieModel[] | null = null;
    
    service.getMovies().subscribe((movies) => {
      result = movies;
    });
    
    const fakeMovies = [{ title: 'Filme 1' }, { title: 'Filme 2' }];

    const req = httpTestingController.expectOne('/movies');
    req.flush(fakeMovies);

    tick();

    expect(result).toEqual(fakeMovies);
  }));

  it('deve filtrar filmes por título', fakeAsync(() => {
    let result: MovieModel[] | null = null;
    
    const fakeMovieTitle = 'Filme';

    service.getMoviesByTitle(fakeMovieTitle).subscribe((movies) => {
      result = movies;
    });
    
    const fakeMovies = [{ title: 'Filme 1' }, { title: 'Filme 2' }];

    const req = httpTestingController.expectOne(`/movies?title_like=${fakeMovieTitle}`);
    req.flush(fakeMovies);

    tick();

    expect(result).toEqual(fakeMovies);
  }));
});
