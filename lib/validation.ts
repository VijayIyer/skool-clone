import validator from 'validator';

export function validateUserSignUpInput({
  first_name,
  last_name,
  email,
  password,
}: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  if (!validateName(first_name)) {
    return {
      success: false,
      message: 'First Name must be only an alphabetical string',
    };
  }

  if (!validateName(last_name)) {
    return {
      success: false,
      message: 'Last Name must be only an alphabetical string',
    };
  }

  if (!validateEmail(email)) {
    return {
      success: false,
      message: 'Invalid email address format',
    };
  }

  if (!validatePassword(password)) {
    return {
      success: false,
      message: 'Password must be at least 5 characters',
    };
  }

  return { success: true };
}

export function validateEmail(email: string) {
  return validator.isEmail(email);
}

export function validatePassword(password: string) {
  return password.length >= 5;
}

export function validateName(name: string) {
  const regName = /^[A-Za-z]+$/;
  return regName.test(name);
}
