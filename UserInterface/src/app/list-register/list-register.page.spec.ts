import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRegisterPage } from './list-register.page';

describe('ListRegisterPage', () => {
  let component: ListRegisterPage;
  let fixture: ComponentFixture<ListRegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
