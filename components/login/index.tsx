import { useState } from "react";
import { Button, TextField, Link, FormHelperText } from "@mui/material";
import NextLink from "next/link";
import styles from "./style.module.css";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import skoolLogo from "@/public/skool.svg";
import { useRouter } from "next/router";

// type LoginFormInput = {
//   email: string;
//   password: string;
// };

export default function LogInForm() {
  const router = useRouter();

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const emailErr = errors.email != undefined;
  const passwordErr = errors.password != undefined;

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<FieldValues> = async (data, e) => {
    // validate with the server
    e?.preventDefault();
    setErrorMessage("");
    let response, responseData;
    try {
      response = await fetch("/api/login", {
        method: "POST",
        mode: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      responseData = await response.json();
    } catch (err) {
      setErrorMessage(`Error: ${err} Please try again.`);
    } finally {
      if (
        response?.ok === true &&
        responseData.success === true &&
        responseData.data.length > 0
      ) {
        router.push(`/@${responseData.data}`);
      } else {
        setErrorMessage(`${responseData.errorMessage}. Please try again.`);
      }
    }

    // reset the form
    reset();
  };
  return (
    <div className={styles.formContainer}>
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
            style={{ color: "#3875f6" }}
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
        {!!errorMessage && (
          <FormHelperText error={true} className={styles.signup_error}>
            {errorMessage}
          </FormHelperText>
        )}
      </form>

      <p style={{ textAlign: "center" }}>
        Don&apos;t have an account?{" "}
        <Link
          component={NextLink}
          href={"/signup"}
          style={{ color: "#3875f6" }}
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
