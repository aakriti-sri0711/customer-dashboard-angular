import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddressDialogueComponent } from './billing-address-dialogue.component';

describe('BillingAddressDialogueComponent', () => {
  let component: BillingAddressDialogueComponent;
  let fixture: ComponentFixture<BillingAddressDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingAddressDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAddressDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
