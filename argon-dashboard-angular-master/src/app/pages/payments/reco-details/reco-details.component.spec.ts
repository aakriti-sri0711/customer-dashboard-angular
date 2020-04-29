import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoDetailsComponent } from './reco-details.component';

describe('RecoDetailsComponent', () => {
  let component: RecoDetailsComponent;
  let fixture: ComponentFixture<RecoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
