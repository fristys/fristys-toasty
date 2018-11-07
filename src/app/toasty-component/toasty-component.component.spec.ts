import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastyComponentComponent } from './toasty-component.component';

describe('ToastyComponentComponent', () => {
  let component: ToastyComponentComponent;
  let fixture: ComponentFixture<ToastyComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastyComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
