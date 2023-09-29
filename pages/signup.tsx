import SignUpForm from "@/components/signup";
import SignUpVerificationForm from "@/components/signup/signUpVerificationForm";
import styles from "../styles/Signup.module.css";
import { useState } from "react";

export default function SignUpPage() {
  const [awaitingVerification, setAwaitingVerification] = useState<boolean>();
  const [signUpEmail, setSignUpEmail] = useState<string>();
  return (
    <main className={styles.container}>
      {awaitingVerification ? (
        <SignUpForm setSignUpEmail={setSignUpEmail} />
      ) : (
        <SignUpVerificationForm email={submittedEmail} />
      )}
    </main>
  );
}
