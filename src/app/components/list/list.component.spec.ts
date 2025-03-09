import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Item, ListComponent } from './list.component';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ListComponent);
  });

  it('deve renderizar 3 filmes', () => {
    const fakeMovies: Item[] = [
      { title: 'Filme 1' },
      { title: 'Filme 2' },
      { title: 'Filme 3' },
    ];

    fixture.componentRef.setInput('data', fakeMovies);

    fixture.detectChanges();

    const itemDebugEls = fixture.debugElement.queryAll(
      By.css('[data-testid="dataItem-list"]')
    );

    expect(itemDebugEls.length).toBe(fakeMovies.length);

    itemDebugEls.forEach((itemDebugEl, index) => {
      expect(itemDebugEl.nativeElement.textContent).toBe(fakeMovies[index].title);
    });
  });
});
