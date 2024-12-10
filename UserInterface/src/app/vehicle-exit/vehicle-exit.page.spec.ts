import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleExitPage } from './vehicle-exit.page';

describe('VehicleExitPage', () => {
  let component: VehicleExitPage;
  let fixture: ComponentFixture<VehicleExitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleExitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
