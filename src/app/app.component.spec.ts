import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, input, output, signal } from '@angular/core';
import { Item, ListComponent } from './components/list/list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MovieModel, MoviesService } from './services/movies/movies.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-search-bar',
  template: '',
})
class FakeSearchBarComponent implements SearchBarComponent {
  inputText = signal('');
  searchText = output<string>();
  onSearch(): void {
    throw new Error('Method not implemented.');
  }
}

@Component({
  selector: 'app-list',
  template: '',
})
class FakeListComponent implements ListComponent {
  data = input.required<Item[]>();
}

class FakeMoviesService implements MoviesService {
  httpClient!: HttpClient;

  getMovies = jest.fn();
  getMoviesByTitle = jest.fn();
}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: MoviesService,
          useClass: FakeMoviesService,
        },
      ],
    });

    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [FakeListComponent, FakeSearchBarComponent],
      },
    });
  });

  it('deve listar os filmes', () => {
    const fakeMovies: MovieModel[] = [
      { title: 'Filme 1' },
      { title: 'Filme 2' },
      { title: 'Filme 3' },
    ];

    const moviesService = TestBed.inject(MoviesService);

    (moviesService.getMovies as jest.Mock).mockReturnValue(of(fakeMovies));

    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    expect(moviesService.getMovies).toHaveBeenCalled();

    const listDebugEl = fixture.debugElement.query(
      By.directive(FakeListComponent)
    );

    expect(listDebugEl.componentInstance.data()).toEqual(fakeMovies);
  });

  it('deve pesquisar um filme', () => {
    const fakeSearchText = 'Kill';

    const fakeKillBill = { title: 'Kill Bill' };
    const fakeKillBill2 = { title: 'Kill Bill 2' };
    const fakeTartarugasNinjas = { title: 'Tartarugas ninjas' };
    const fakeMatrix = { title: 'Matrix' };

    const fakeMovies = [
      fakeKillBill,
      fakeKillBill2,
      fakeTartarugasNinjas,
      fakeMatrix,
    ];

    const fakeFilteredMovies = [fakeKillBill, fakeKillBill2];

    const moviesService = TestBed.inject(MoviesService);

    (moviesService.getMovies as jest.Mock).mockReturnValue(of(fakeMovies));

    (moviesService.getMoviesByTitle as jest.Mock).mockReturnValue(
      of(fakeFilteredMovies)
    );

    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const searchBarDebugEl = fixture.debugElement.query(
      By.directive(FakeSearchBarComponent)
    );

    searchBarDebugEl.componentInstance.searchText.emit(fakeSearchText);

    fixture.detectChanges();

    expect(moviesService.getMoviesByTitle).toHaveBeenCalledWith(fakeSearchText);

    const listDebugEl = fixture.debugElement.query(
      By.directive(FakeListComponent)
    );

    expect(listDebugEl.componentInstance.data()).toEqual(fakeFilteredMovies);
  });
});
