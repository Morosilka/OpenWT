import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBoatsComponent } from './add-edit-boats.component';

describe('AddEditBoatsComponent', () => {
  let component: AddEditBoatsComponent;
  let fixture: ComponentFixture<AddEditBoatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBoatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
