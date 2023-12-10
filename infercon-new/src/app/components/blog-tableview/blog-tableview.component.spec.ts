import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTableviewComponent } from './blog-tableview.component';

describe('BlogTableviewComponent', () => {
  let component: BlogTableviewComponent;
  let fixture: ComponentFixture<BlogTableviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogTableviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogTableviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
