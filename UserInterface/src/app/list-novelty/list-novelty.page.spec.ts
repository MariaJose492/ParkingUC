import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListNoveltyPage } from './list-novelty.page';

describe('ListNoveltyPage', () => {
  let component: ListNoveltyPage;
  let fixture: ComponentFixture<ListNoveltyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNoveltyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
