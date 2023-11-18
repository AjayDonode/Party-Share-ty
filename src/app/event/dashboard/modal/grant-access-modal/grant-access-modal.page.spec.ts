import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { GrantAccessModalPage } from './grant-access-modal.page';

describe('GrantAccessModalPage', () => {
  let component: GrantAccessModalPage;
  let fixture: ComponentFixture<GrantAccessModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GrantAccessModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
