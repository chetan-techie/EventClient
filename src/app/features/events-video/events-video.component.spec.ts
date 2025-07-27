import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsVideoComponent } from './events-video.component';

describe('EventsVideoComponent', () => {
  let component: EventsVideoComponent;
  let fixture: ComponentFixture<EventsVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
