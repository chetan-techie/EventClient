import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionClassesComponent } from './vision-classes.component';

describe('VisionClassesComponent', () => {
  let component: VisionClassesComponent;
  let fixture: ComponentFixture<VisionClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisionClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisionClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
