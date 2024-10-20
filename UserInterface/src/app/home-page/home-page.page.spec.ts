import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePagePage } from './home-page.page';

describe('HomePagePage', () => {
  let component: HomePagePage;
  let fixture: ComponentFixture<HomePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
