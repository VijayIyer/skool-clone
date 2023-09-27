import {
  validateUserSignUpInput,
  validateEmail,
  validatePassword,
  validateName,
} from '../../../lib/userLib';

describe('validateUserSignUpInput', () => {
  it('should return success when input is valid', () => {
    const input = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
    };
    const result = validateUserSignUpInput(input);
    expect(result).toEqual({ success: true });
  });

  it('should return an error message when first name is invalid', () => {
    const input = {
      firstName: '123', // Invalid first name
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
    };
    const result = validateUserSignUpInput(input);
    expect(result).toEqual({
      success: false,
      message:
        'Validation error: First Name must be only an alphabetical string and length should be less or equal 20 charachters',
    });
  });

  it('should return an error message when last name is invalid', () => {
    const input = {
      firstName: 'John',
      lastName: '123', // Invalid last name
      email: 'john@example.com',
      password: 'password123',
    };
    const result = validateUserSignUpInput(input);
    expect(result).toEqual({
      success: false,
      message:
        'Validation error: Last Name must be only an alphabetical string and length should be less or equal 20 charachters',
    });
  });

  it('should return an error message when email is invalid', () => {
    const input = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email', // Invalid email
      password: 'password123',
    };
    const result = validateUserSignUpInput(input);
    expect(result).toEqual({
      success: false,
      message: 'Validation error: Invalid email address format',
    });
  });

  it('should return an error message when password is too short', () => {
    const input = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '1234', // Password too short
    };
    const result = validateUserSignUpInput(input);
    expect(result).toEqual({
      success: false,
      message: 'Validation error: Password must be at least 5 characters',
    });
  });
});

describe('validateEmail', () => {
  it('should return true for a valid email', () => {
    const validEmail = 'john@example.com';
    const result = validateEmail(validEmail);
    expect(result).toBe(true);
  });

  it('should return false for an invalid email', () => {
    const invalidEmail = 'invalid-email';
    const result = validateEmail(invalidEmail);
    expect(result).toBe(false);
  });
});

describe('validatePassword', () => {
  it('should return true for a password with at least 5 characters', () => {
    const validPassword = 'password123';
    const result = validatePassword(validPassword);
    expect(result).toBe(true);
  });

  it('should return false for a password with fewer than 5 characters', () => {
    const invalidPassword = '1234';
    const result = validatePassword(invalidPassword);
    expect(result).toBe(false);
  });
});

describe('validateName', () => {
  it('should return false for a name with space', () => {
    const validName = 'John Doe';
    const result = validateName(validName);
    expect(result).toBe(false);
  });

  it('should return true for a valid single-word name', () => {
    const validName = 'John';
    const result = validateName(validName);
    expect(result).toBe(true);
  });

  it('should return false for a name with non-alphabetical characters', () => {
    const invalidName = 'John123';
    const result = validateName(invalidName);
    expect(result).toBe(false);
  });
});
