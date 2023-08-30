import Link from '@mui/material/Link';
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <div className={styles.footer} data-testid="footer">
            <Link color="rgb(144, 144, 144)" underline='hover' data-testid="footer-item">help@skool.com</Link>
            <Link color="rgb(144, 144, 144)" underline='hover'>Pricing</Link>
            <Link color="rgb(144, 144, 144)" underline='hover'>Merch</Link>
            <Link color="rgb(144, 144, 144)" underline='hover'>Affiliates</Link>
            <Link color="rgb(144, 144, 144)" underline='hover'>Careers</Link>
            <Link color="rgb(144, 144, 144)" underline='hover'>Privacy</Link>
            <Link color="rgb(144, 144, 144)" underline='hover'>Community</Link>
        </div>
    )
}