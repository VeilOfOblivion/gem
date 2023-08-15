import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupListComponent } from './usergroup-list.component';

describe('UsergroupListComponent', () => {
  let component: UsergroupListComponent;
  let fixture: ComponentFixture<UsergroupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsergroupListComponent]
    });
    fixture = TestBed.createComponent(UsergroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
