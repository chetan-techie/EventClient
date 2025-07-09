import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JyotishaComponent } from './jyotisha.component';

describe('JyotishaComponent', () => {
  let component: JyotishaComponent;
  let fixture: ComponentFixture<JyotishaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JyotishaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JyotishaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
