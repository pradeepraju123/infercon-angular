import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCardviewComponent } from './training-cardview.component';

describe('TrainingCardviewComponent', () => {
  let component: TrainingCardviewComponent;
  let fixture: ComponentFixture<TrainingCardviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingCardviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingCardviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
