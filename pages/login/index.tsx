import { Button, TextField } from "@mui/material";
import Link from "next/link";
import styles from "./styles.module.css";
import { FormEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
const Login = () => {
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const emailErr = errors.email != undefined;
  const passwordErr = errors.password != undefined;

  const customeSubmit = (data: FieldValues) => {
    console.log(data);

    // validate with the server

    // reset the form
    reset();
  };
  return (
    <div className={styles.formContainer}>
      <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
        <h2>
          <span style={{ color: "#263397" }}>s</span>
          <span style={{ color: "#d3513e" }}>k</span>
          <span style={{ color: "#e0b467" }}>o</span>
          <span style={{ color: "#6bb7ee " }}>o</span>
          <span style={{ color: "#c45946" }}>l</span>
        </h2>
        <p style={{ marginTop: "1.5rem", fontWeight: "bold" }}>
          Log in to Skool
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(customeSubmit)}>
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
          <Link href="/reset-password" style={{ color: "#3875f6" }}>
            Forgot password?
          </Link>
        </p>
        <Button
          variant="contained"
          className={styles.btn}
          type="submit"
          disabled={isSubmitting}
        >
          LOG IN{" "}
        </Button>
      </form>

      <p style={{ textAlign: "center" }}>
        Don't have an account?{" "}
        <Link href={"/singup"} style={{ color: "#3875f6" }}>
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
