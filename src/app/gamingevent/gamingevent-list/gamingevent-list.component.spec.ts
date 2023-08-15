import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingeventListComponent } from './gamingevent-list.component';

describe('GamingeventListComponent', () => {
  let component: GamingeventListComponent;
  let fixture: ComponentFixture<GamingeventListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamingeventListComponent]
    });
    fixture = TestBed.createComponent(GamingeventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
