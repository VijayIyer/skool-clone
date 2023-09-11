import validator from 'validator';

export function validateUserSignUpInput({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  if (!validateName(firstName)) {
    return {
      success: false,
      message:
        'Validation error: First Name must be only an alphabetical string and length should be less or equal 20 charachters',
    };
  }

  if (!validateName(lastName)) {
    return {
      success: false,
      message:
        'Validation error: Last Name must be only an alphabetical string and length should be less or equal 20 charachters',
    };
  }

  if (!validateEmail(email)) {
    return {
      success: false,
      message: 'Validation error: Invalid email address format',
    };
  }

  if (!validatePassword(password)) {
    return {
      success: false,
      message: 'Validation error: Password must be at least 5 characters',
    };
  }

  return { success: true };
}

export function validateEmail(email: string) {
  return validator.isEmail(email);
}

export function validatePassword(password: string) {
  return password.length >= 5 && password.length < 72;
}

export function validateName(name: string) {
  if (!name) {
    return false;
  }
  if (name.length > 20) {
    return false;
  }
  const regName = /^[A-Za-z]+$/;
  return regName.test(name);
}
