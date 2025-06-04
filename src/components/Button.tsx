import styles from "./Button.module.css";
import type { IButton } from "../lib/types";

export default function Button({ children, onClick, type }: IButton) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
