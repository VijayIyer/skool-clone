import LogInForm from "../components/Login";
import styles from "@/styles/Login.module.css";

export default function LogInPage() {
  return (
    <main className={styles.container}>
      <LogInForm />
    </main>
  );
}
