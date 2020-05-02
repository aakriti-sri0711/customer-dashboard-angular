import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillAddressComponent } from './fill-address.component';

describe('FillAddressComponent', () => {
  let component: FillAddressComponent;
  let fixture: ComponentFixture<FillAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
