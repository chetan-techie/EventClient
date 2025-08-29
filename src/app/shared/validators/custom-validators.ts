import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static graduationYear(control: AbstractControl): ValidationErrors | null {
    const year = control.value;
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 50;

    if (year && (year < minYear || year > currentYear)) {
      return { invalidYear: true };
    }
    return null;
  }

  static profanityCheck(control: AbstractControl): ValidationErrors | null {
    const text = control.value?.toLowerCase() || '';
    const profanityWords = ['badword1', 'badword2']; // Add actual words

    const hasProfanity = profanityWords.some((word) => text.includes(word));
    if (hasProfanity) {
      return { profanity: true };
    }
    return null;
  }

  static fileSize(maxSize: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      if (file && file.size > maxSize) {
        return { fileSize: { maxSize, actualSize: file.size } };
      }
      return null;
    };
  }

  static fileType(allowedTypes: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      if (file && !allowedTypes.includes(file.type)) {
        return { fileType: { allowedTypes, actualType: file.type } };
      }
      return null;
    };
  }
}
