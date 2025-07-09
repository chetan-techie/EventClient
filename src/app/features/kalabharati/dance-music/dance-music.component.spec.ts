import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceMusicComponent } from './dance-music.component';

describe('DanceMusicComponent', () => {
  let component: DanceMusicComponent;
  let fixture: ComponentFixture<DanceMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DanceMusicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanceMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
