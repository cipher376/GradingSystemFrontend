import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserToRoleComponent } from './user-to-role.component';

describe('UserToRoleComponent', () => {
  let component: UserToRoleComponent;
  let fixture: ComponentFixture<UserToRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserToRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserToRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
