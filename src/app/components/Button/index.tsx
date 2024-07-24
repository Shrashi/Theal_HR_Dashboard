// components/Button.jsx
"use client";
import styles from "./index.module.scss";

const Button = ({
  btnText,
  onClick,
}: {
  btnText: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div>
      <button className={styles.button} onClick={onClick}>
        {btnText}
      </button>
    </div>
  );
};

export default Button;
