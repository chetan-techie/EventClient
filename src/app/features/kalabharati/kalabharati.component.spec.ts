import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalabharatiComponent } from './kalabharati.component';

describe('KalabharatiComponent', () => {
  let component: KalabharatiComponent;
  let fixture: ComponentFixture<KalabharatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KalabharatiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KalabharatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
