import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyUserComponent } from './notify-user.component';

describe('NotifyUserComponent', () => {
  let component: NotifyUserComponent;
  let fixture: ComponentFixture<NotifyUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
