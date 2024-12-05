import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArteresComponent } from './arteres.component';

describe('ArteresComponent', () => {
  let component: ArteresComponent;
  let fixture: ComponentFixture<ArteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArteresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
