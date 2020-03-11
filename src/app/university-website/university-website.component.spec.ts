import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityWebsiteComponent } from './university-website.component';

describe('UniversityWebsiteComponent', () => {
  let component: UniversityWebsiteComponent;
  let fixture: ComponentFixture<UniversityWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
