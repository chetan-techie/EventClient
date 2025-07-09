import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocurricularComponent } from './cocurricular.component';

describe('CocurricularComponent', () => {
  let component: CocurricularComponent;
  let fixture: ComponentFixture<CocurricularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocurricularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
