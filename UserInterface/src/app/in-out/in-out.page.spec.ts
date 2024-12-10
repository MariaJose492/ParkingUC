import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InOutPage } from './in-out.page';

describe('InOutPage', () => {
  let component: InOutPage;
  let fixture: ComponentFixture<InOutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InOutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
