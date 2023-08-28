import Link from '@mui/material/Link';
import styles from "./ControllerBar.module.css";

export default function ControllerBar() {
    return (
        <div className={styles.bar}>
            <Link href="/signup" underline='none'>
                <button className={styles.leftButton}>
                    Create Your Community
                </button>
            </Link>
            <Link href="/community"  underline='none'>
                <button className={styles.rightButton}>
                    See it in Action
                </button>
            </Link>
        </div>
    )
}