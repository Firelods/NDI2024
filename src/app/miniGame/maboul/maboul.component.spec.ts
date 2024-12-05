import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaboulComponent } from './maboul.component';

describe('MaboulComponent', () => {
  let component: MaboulComponent;
  let fixture: ComponentFixture<MaboulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaboulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaboulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
