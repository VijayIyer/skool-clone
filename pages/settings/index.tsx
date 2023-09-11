import ChangePasswordForm from "@/components/ChangePassword";
import styles from "../../styles/ChangePassword.module.css";
import EntryPageHeader from "@/components/EntryPageHeader";
import EntryPageFooter from "@/components/EntryPageFooter";

export default function ChangePassword() {
  return (
    <main className={styles.container}>
      <ChangePasswordForm />
    </main>
  );
}
