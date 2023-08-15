import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingeventDetailsComponent } from './gamingevent-details.component';

describe('GamingeventDetailsComponent', () => {
  let component: GamingeventDetailsComponent;
  let fixture: ComponentFixture<GamingeventDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamingeventDetailsComponent]
    });
    fixture = TestBed.createComponent(GamingeventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
