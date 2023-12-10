import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesTableviewComponent } from './services-tableview.component';

describe('ServicesTableviewComponent', () => {
  let component: ServicesTableviewComponent;
  let fixture: ComponentFixture<ServicesTableviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesTableviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesTableviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
