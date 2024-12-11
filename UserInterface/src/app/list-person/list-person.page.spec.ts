import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPersonPage } from './list-person.page';

describe('ListPersonPage', () => {
  let component: ListPersonPage;
  let fixture: ComponentFixture<ListPersonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
