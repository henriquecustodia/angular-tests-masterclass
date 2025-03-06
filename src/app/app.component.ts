import { Component } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [SearchBarComponent],
})
export class AppComponent {
  
  onSearch($event: string) {
    console.log($event);
  }

}
