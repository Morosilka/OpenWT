import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBoatsComponent } from './show-boats.component';

describe('ShowBoatsComponent', () => {
  let component: ShowBoatsComponent;
  let fixture: ComponentFixture<ShowBoatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBoatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
