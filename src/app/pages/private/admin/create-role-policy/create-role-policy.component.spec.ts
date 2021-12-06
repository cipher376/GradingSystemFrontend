import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRolePolicyComponent } from './create-role-policy.component';

describe('CreateRolePolicyComponent', () => {
  let component: CreateRolePolicyComponent;
  let fixture: ComponentFixture<CreateRolePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRolePolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRolePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
