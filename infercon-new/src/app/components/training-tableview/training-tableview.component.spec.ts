import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTableviewComponent } from './training-tableview.component';

describe('TrainingTableviewComponent', () => {
  let component: TrainingTableviewComponent;
  let fixture: ComponentFixture<TrainingTableviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingTableviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingTableviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
