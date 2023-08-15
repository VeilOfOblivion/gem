import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingeventComponent } from './gamingevent.component';

describe('GamingeventComponent', () => {
  let component: GamingeventComponent;
  let fixture: ComponentFixture<GamingeventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamingeventComponent]
    });
    fixture = TestBed.createComponent(GamingeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
