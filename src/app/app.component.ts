import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MovieModel, MoviesService } from './services/movies/movies.service';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [SearchBarComponent, ListComponent],
})
export class AppComponent implements OnInit {
  moviesService = inject(MoviesService);

  movies = signal<MovieModel[]>([]);

  ngOnInit() {
    this.moviesService.getMovies().subscribe((movies) => {
      this.movies.set(movies);
    });
  }

  onSearch(text: string) {
    this.moviesService.getMoviesByTitle(text).subscribe((movies) => {
      this.movies.set(movies);
    });
  }
}
