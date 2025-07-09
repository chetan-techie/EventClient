import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsTileComponent } from './cards-tile.component';

describe('CardsTileComponent', () => {
  let component: CardsTileComponent;
  let fixture: ComponentFixture<CardsTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
