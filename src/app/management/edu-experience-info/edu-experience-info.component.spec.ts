import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduExperienceInfoComponent } from './edu-experience-info.component';

describe('EduExperienceInfoComponent', () => {
  let component: EduExperienceInfoComponent;
  let fixture: ComponentFixture<EduExperienceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduExperienceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduExperienceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
