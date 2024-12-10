import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoveltyPage } from './novelty.page';

describe('NoveltyPage', () => {
  let component: NoveltyPage;
  let fixture: ComponentFixture<NoveltyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
