import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignForgotPasswordPage } from './sign-forgot-password.page';

describe('SignForgotPasswordPage', () => {
  let component: SignForgotPasswordPage;
  let fixture: ComponentFixture<SignForgotPasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SignForgotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
