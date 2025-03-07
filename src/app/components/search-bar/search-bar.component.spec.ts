import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  // let component: SearchBarComponent;
  // let fixture: ComponentFixture<SearchBarComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [SearchBarComponent],
  //   }).compileComponents();

  //   fixture = TestBed.createComponent(SearchBarComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('deve pesquisar um filme', () => {
    @Component({
      selector: 'app-test-search-bar',
      imports: [SearchBarComponent],
      template: ` <app-search-bar (searchText)="onSearch($event)" /> `,
    })
    class TestSearchBarComponent {
      onSearch(event: string) {}
    }
    
    const fixture = TestBed.createComponent(TestSearchBarComponent);
    fixture.detectChanges();

    const spy = jest.spyOn(fixture.componentInstance, 'onSearch');
    
    const inputTextDebugEl = fixture.debugElement.query(
      By.css('[data-testid="inputText-searchBar"]')
    );

    const fakeText = 'Matrix';

    inputTextDebugEl.triggerEventHandler('input', {
      target: { value: fakeText },
    });

    const searchBtnDebugEl = fixture.debugElement.query(
      By.css('[data-testid="searchBtn-searchBar"]')
    );

    searchBtnDebugEl.triggerEventHandler('click');

    expect(spy).toHaveBeenCalledWith(fakeText);
  });
});
