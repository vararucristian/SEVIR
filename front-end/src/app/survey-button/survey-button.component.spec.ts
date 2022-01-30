import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyButtonComponent } from './survey-button.component';

describe('SurveyButtonComponent', () => {
  let component: SurveyButtonComponent;
  let fixture: ComponentFixture<SurveyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
