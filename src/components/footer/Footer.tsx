import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        Copyright {new Date().getFullYear()} by WorldWise Inc.
      </p>
    </footer>
  );
}
