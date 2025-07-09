import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAnnouncementsComponent } from './add-edit-announcements.component';

describe('AddEditAnnouncementsComponent', () => {
  let component: AddEditAnnouncementsComponent;
  let fixture: ComponentFixture<AddEditAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditAnnouncementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
