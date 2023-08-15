import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupDetailsComponent } from './usergroup-details.component';

describe('UsergroupDetailsComponent', () => {
  let component: UsergroupDetailsComponent;
  let fixture: ComponentFixture<UsergroupDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsergroupDetailsComponent]
    });
    fixture = TestBed.createComponent(UsergroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
