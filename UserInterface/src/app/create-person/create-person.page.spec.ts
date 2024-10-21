import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePersonPage } from './create-person.page';

describe('CreatePersonPage', () => {
  let component: CreatePersonPage;
  let fixture: ComponentFixture<CreatePersonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
