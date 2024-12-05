import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaugesComponent } from './jauges.component';

describe('JaugesComponent', () => {
  let component: JaugesComponent;
  let fixture: ComponentFixture<JaugesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaugesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaugesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
