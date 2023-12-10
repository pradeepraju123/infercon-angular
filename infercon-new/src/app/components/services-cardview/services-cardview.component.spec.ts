import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesCardviewComponent } from './services-cardview.component';

describe('ServicesCardviewComponent', () => {
  let component: ServicesCardviewComponent;
  let fixture: ComponentFixture<ServicesCardviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesCardviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesCardviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
