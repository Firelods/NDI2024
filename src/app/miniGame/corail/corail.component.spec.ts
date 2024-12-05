import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorailComponent } from './corail.component';

describe('CorailComponent', () => {
  let component: CorailComponent;
  let fixture: ComponentFixture<CorailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
