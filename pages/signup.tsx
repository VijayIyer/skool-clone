import SignUpForm from "@/components/signup";
import SignUpVerificationForm from "@/components/signup/signUpVerificationForm";
import styles from "../styles/Signup.module.css";
import { useState } from "react";

export default function SignUpPage() {
  return (
    <main className={styles.container}>
      <SignUpForm />
    </main>
  );
}
