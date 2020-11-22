import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsaCriptoComponent } from './rsa-cripto.component';

describe('RsaCriptoComponent', () => {
  let component: RsaCriptoComponent;
  let fixture: ComponentFixture<RsaCriptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsaCriptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsaCriptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
