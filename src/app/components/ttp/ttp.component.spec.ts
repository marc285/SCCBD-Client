import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtpComponent } from './ttp.component';

describe('TtpComponent', () => {
  let component: TtpComponent;
  let fixture: ComponentFixture<TtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
