import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingeventEditComponent } from './gamingevent-edit.component';

describe('GamingeventEditComponent', () => {
  let component: GamingeventEditComponent;
  let fixture: ComponentFixture<GamingeventEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamingeventEditComponent]
    });
    fixture = TestBed.createComponent(GamingeventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
