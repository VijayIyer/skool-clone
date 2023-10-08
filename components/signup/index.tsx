import { MouseEvent, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import skoolLogo from "/public/skool.svg";
import styles from "./style.module.css";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  Link,
  Typography,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import SignUpVerificationForm from "./signUpVerificationForm";
import { SignupFormInput, VerificationFormInput } from "./signUpFormInputTypes";
import { generateOtpService } from "@/lib/signUpService/generateOtp";
import { signUpService } from "@/lib/signUpService/signUp";

export default function SignUpForm() {
  const [awaitingVerification, setAwaitingVerification] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpFormError, setOtpFormError] = useState<boolean>(false);
  const [statusText, setStatusText] = useState("");
  const router = useRouter();

  const handleClickShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    setShowPassword((show) => !show);
    event.preventDefault();
  };

  const { control, handleSubmit } = useForm<SignupFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const allowedCharRegex = /^[A-Za-z0-9 ]+$/;

  const signUp: SubmitHandler<VerificationFormInput> = async (data, e) => {
    e?.preventDefault();
    const signUpData = {
      ...data,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
    };
    console.log(signUpData);
    const response = await signUpService(signUpData);
    if (response.success) {
      /** perform callback or checking of token */
      router.push("/");
    } else setOtpFormError(true);
  };
  const generateOtp: SubmitHandler<SignupFormInput> = async (data, e) => {
    e?.preventDefault();
    console.log(JSON.stringify(data));
    const response = await generateOtpService(data);
    if (response.success) setAwaitingVerification(true);
    else setStatusText(`Error: ${response.errorMessage} Please try again.`);
  };

  const { field: firstName, fieldState: firstNameState } = useController({
    name: "firstName",
    control,
    rules: {
      required: true,
      maxLength: {
        value: 20,
        message: "First name can be up to 20 characters",
      },
      pattern: {
        value: allowedCharRegex,
        message: "Please use a valid name",
      },
    },
  });
  const { field: lastName, fieldState: lastNameState } = useController({
    name: "lastName",
    control,
    rules: {
      required: true,
      maxLength: {
        value: 20,
        message: "Last name can be up to 20 characters",
      },
      pattern: {
        value: allowedCharRegex,
        message: "Please use a valid name",
      },
    },
  });
  const { field: email, fieldState: emailState } = useController({
    name: "email",
    control,
    rules: {
      required: true,
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email",
      },
    },
  });
  const { field: password, fieldState: passwordState } = useController({
    name: "password",
    control,
    rules: {
      required: true,
      minLength: {
        value: 5,
        message: "Password must be at least 5 characters",
      },
      maxLength: {
        value: 72,
        message: "Password can be up to 72 characters",
      },
    },
  });

  if (awaitingVerification) {
    return (
      <SignUpVerificationForm
        setAwaitingVerification={setAwaitingVerification}
        isInvalid={otpFormError}
        signUp={signUp}
        resend={signUp}
        email={email.value}
      />
    );
  }
  return (
    <div className={styles.signup_paper}>
      <div className={styles.signup_body}>
        <NextLink href='/'>
          <Image
            src={skoolLogo}
            width={72}
            alt='logo of skool'
            className={styles.signup_logo}
          />
        </NextLink>
        <div className={styles.signup_title}>Create your Skool account</div>
        <form
          data-testid='sign-up-dialog-sign-up-content'
          className={styles.signup_form}
          onSubmit={handleSubmit(generateOtp)}
        >
          <div className={styles.signup_inputs}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel htmlFor='first_name' error={firstNameState.invalid}>
                First name
              </InputLabel>
              <OutlinedInput
                id='first_name'
                data-testid='input-component'
                onChange={firstName.onChange}
                name={firstName.name}
                inputRef={firstName.ref}
                error={firstNameState.invalid}
                inputProps={{
                  "aria-errormessage": "first-name-error-message",
                }}
                label='First name'
                fullWidth
                autoFocus
              />
              {firstNameState.error && (
                <FormHelperText
                  id='first-name-error-message'
                  error={firstNameState.invalid}
                  className={styles.signup_error}
                >
                  {firstNameState.error?.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl variant='outlined' fullWidth>
              <InputLabel htmlFor='last_name' error={lastNameState.invalid}>
                Last name
              </InputLabel>
              <OutlinedInput
                id='last_name'
                data-testid='input-component'
                onChange={lastName.onChange}
                name={lastName.name}
                inputRef={lastName.ref}
                error={lastNameState.invalid}
                inputProps={{
                  "aria-errormessage": "last-name-error-message",
                }}
                label='Last name'
                fullWidth
              />
              {lastNameState.error && (
                <FormHelperText
                  id='last-name-error-message'
                  error={lastNameState.invalid}
                  className={styles.signup_error}
                >
                  {lastNameState.error?.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl variant='outlined' fullWidth>
              <InputLabel htmlFor='email' error={emailState.invalid}>
                Email
              </InputLabel>
              <OutlinedInput
                id='email'
                data-testid='input-component'
                onChange={email.onChange}
                name={email.name}
                inputRef={email.ref}
                error={emailState.invalid}
                inputProps={{
                  "aria-errormessage": "email-error-message",
                }}
                fullWidth
                label='Email'
              />
              {emailState.error && (
                <FormHelperText
                  id='email-error-message'
                  error={emailState.invalid}
                  className={styles.signup_error}
                >
                  {emailState.error?.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl variant='outlined' fullWidth>
              <InputLabel htmlFor='password' error={passwordState.invalid}>
                Password
              </InputLabel>
              <OutlinedInput
                id='password'
                data-testid='input-component'
                onChange={password.onChange}
                name={password.name}
                inputRef={password.ref}
                error={passwordState.invalid}
                inputProps={{
                  "aria-errormessage": "password-error-message",
                }}
                fullWidth
                type={showPassword ? "text" : "password"}
                endAdornment={
                  password.value.length > 0 && (
                    <InputAdornment position='end'>
                      <IconButton
                        data-testid='toggle-visibility'
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
                label='Password'
              />
              {passwordState.error && (
                <FormHelperText
                  id='password-error-message'
                  error={passwordState.invalid}
                  className={styles.signup_error}
                >
                  {passwordState.error?.message}
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <Button
            data-testid='sign-up-btn'
            type='submit'
            variant='contained'
            disabled={
              firstName.value.length === 0 ||
              lastName.value.length === 0 ||
              email.value.length === 0 ||
              password.value.length === 0
            }
            size='large'
            sx={{ marginBottom: "1rem" }}
            fullWidth
          >
            Sign Up
          </Button>
          {!!statusText && (
            <FormHelperText error={true} className={styles.signup_error}>
              {statusText}
            </FormHelperText>
          )}
          <Typography className={styles.signup_agreement}>
            <span>By signing up, you accept our </span>
            <NextLink
              href='https://www.skool.com/legal?t=terms'
              color='inherit'
              className={styles.signup_legal}
            >
              terms
            </NextLink>
            <span> and </span>
            <NextLink
              href='https://www.skool.com/legal?t=privacy'
              color='inherit'
              className={styles.signup_legal}
            >
              privacy
            </NextLink>
            <span> policy.</span>
          </Typography>
        </form>
        <Typography>
          Already have an account?{" "}
          <Link component={NextLink} href='/login'>
            Log in
          </Link>
        </Typography>
      </div>
    </div>
  );
}
