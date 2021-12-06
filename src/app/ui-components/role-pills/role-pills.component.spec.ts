import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePillsComponent } from './role-pills.component';

describe('RolePillsComponent', () => {
  let component: RolePillsComponent;
  let fixture: ComponentFixture<RolePillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolePillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
