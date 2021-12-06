import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePolicyListComponent } from './role-policy-list.component';

describe('RolePolicyListComponent', () => {
  let component: RolePolicyListComponent;
  let fixture: ComponentFixture<RolePolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolePolicyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
