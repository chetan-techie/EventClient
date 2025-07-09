import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SslcResultsComponent } from './sslc-results.component';

describe('SslcResultsComponent', () => {
  let component: SslcResultsComponent;
  let fixture: ComponentFixture<SslcResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SslcResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SslcResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
