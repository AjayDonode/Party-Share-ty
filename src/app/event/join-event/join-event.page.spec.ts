import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinEventPage } from './join-event.page';

describe('JoinEventPage', () => {
  let component: JoinEventPage;
  let fixture: ComponentFixture<JoinEventPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JoinEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
