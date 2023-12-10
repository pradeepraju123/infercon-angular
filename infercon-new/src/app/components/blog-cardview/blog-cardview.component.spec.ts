import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCardviewComponent } from './blog-cardview.component';

describe('BlogCardviewComponent', () => {
  let component: BlogCardviewComponent;
  let fixture: ComponentFixture<BlogCardviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogCardviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogCardviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
