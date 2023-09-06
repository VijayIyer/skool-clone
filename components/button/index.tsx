// An example MUI component to test the functionality
import Button from "@mui/material/Button";
import style from "./style.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  size: "small" | "median" | "large";
}

export default function TestButton(props: ButtonProps) {
  const {
    children,
    size= "small",
    disabled = false,
    onClick = () => {},
  } = props;

  return (
    <Button
      className={style.button}
      disabled={disabled}
      size={size}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

// import styles from './styles.module.css'

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return <section className={styles.dashboard}>{children}</section>
// }
// app/dashboard/styles.module.css

// .dashboard {
//   padding: 24px;
// }
