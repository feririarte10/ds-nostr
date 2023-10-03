import { ReactNode } from "react";
import styles from "./HelpButton.module.css";

type HelpButtonProps = {
  btnText: string;
  onClick?: (e: any) => void;
  icon?: ReactNode;
};

export default function HelpButton({
  btnText,
  onClick,
  icon,
}: HelpButtonProps) {
  return (
    <button className={styles.helpButton} onClick={onClick}>
      {icon}
      {btnText}
    </button>
  );
}
