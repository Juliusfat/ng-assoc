import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRoleComponent } from './member-role.component';

describe('MemberRoleComponent', () => {
  let component: MemberRoleComponent;
  let fixture: ComponentFixture<MemberRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
