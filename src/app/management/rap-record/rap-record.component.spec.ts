import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapRecordComponent } from './rap-record.component';

describe('RapRecordComponent', () => {
  let component: RapRecordComponent;
  let fixture: ComponentFixture<RapRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
