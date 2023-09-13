import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandelingService {

  handleFirebaseError(error: any): string {
    let errorMessage = 'An error occurred.';
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'User not found.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Wrong password.';
          break;
        // Add more custom error code handling here
        default:
          errorMessage = 'An unexpected error occurred.';
          break;
      }
    }

    return errorMessage;
  }

}
