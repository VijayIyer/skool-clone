import { Button, TextField, Link } from "@mui/material";
import NextLink from "next/link";
import styles from "./style.module.css";
import { FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import skoolLogo from "@/public/skool.svg";
import {FC} from "react";

type LogInFormProps = {
  switchToSignUp?: () => void | undefined;
}

const LogInForm:FC<LogInFormProps> = ({switchToSignUp}) => {
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const emailErr = errors.email != undefined;
  const passwordErr = errors.password != undefined;

  const customSubmit = (data: FieldValues) => {
    console.log(data);

    // validate with the server

    // reset the form
    reset();
  };

  return (
    <div className={`${styles.formContainer} ${switchToSignUp && 'form-background-color--transparent'}`}>
      <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
        <h2 className={styles.h2}>
          <NextLink href="/">
            <Image
              src={skoolLogo}
              width={72}
              alt="logo of skool"
              className={styles.signup_logo}
            />
          </NextLink>
        </h2>
        <p style={{ marginTop: "1.5rem", fontWeight: "bold" }}>
          Log in to Skool
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(customSubmit)}>
        <TextField
          label="Email"
          type="email"
          error={emailErr}
          {...register("email", { required: "Enter an email" })}
        />
        {errors.email && (
          <p className={styles.errMsg}>{`${errors.email?.message}`}</p>
        )}
        <TextField
          label="Password"
          type="password"
          error={passwordErr}
          {...register("password", {
            required: "Enter a password",
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters",
            },
          })}
        />
        {errors.password && (
          <p className={styles.errMsg}>{`${errors.password?.message}`}</p>
        )}
        <p style={{ color: "blue" }}>
          <Link
            component={NextLink}
            href="/reset-password"
            style={{
              color: "#3875f6",
              textDecoration: "none",
            }}
          >
            Forgot password?
          </Link>
        </p>
        <Button
          variant="contained"
          className={styles.btn}
          type="submit"
          disabled={isSubmitting}
          fullWidth
        >
          LOG IN
        </Button>
      </form>

      <p style={{ textAlign: "center" }}>
        Don&apos;t have an account?{" "}
        {switchToSignUp ? (
            <span onClick={switchToSignUp} className={styles.modalSwitch_span}>
              Sign up for free
            </span>
        ) : (
            <Link
                component={NextLink}
                href='/signup'
                style={{
                  color: "#3875f6",
                  textDecoration: "none"
                }}
            >
              Sign up
            </Link>
        )}

      </p>
    </div>
  );
}
export default LogInForm