import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFamilyInfoComponent } from './teacher-family-info.component';

describe('TeacherFamilyInfoComponent', () => {
  let component: TeacherFamilyInfoComponent;
  let fixture: ComponentFixture<TeacherFamilyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherFamilyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFamilyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
