import SignUpForm from "@/components/signup";
import SignUpVerificationForm from "@/components/signup/signUpVerificationForm";
import styles from "../styles/Signup.module.css";

export default function SignUpPage() {
  return (
    <main className={styles.container}>
      <SignUpVerificationForm email='vijayiyer7@gmail.com' />
    </main>
  );
}
