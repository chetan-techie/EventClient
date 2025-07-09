import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtPaintingComponent } from './art-painting.component';

describe('ArtPaintingComponent', () => {
  let component: ArtPaintingComponent;
  let fixture: ComponentFixture<ArtPaintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtPaintingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtPaintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
