import React from "react";
import styles from "./index.module.scss";

interface FlexContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  dir: "row" | "col";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const FlexContainer = ({
  dir,
  children,
  className,
  style,
}: FlexContainerProps) => {
  return (
    <div
      className={[
        dir === "row" ? styles.FlexContainerRow : styles.FlexContainerCol,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </div>
  );
};

export default FlexContainer;
