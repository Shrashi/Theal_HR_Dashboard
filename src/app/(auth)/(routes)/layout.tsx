import React from "react";
import FlexContainer from "@/app/components/FlexContainer";
import styles from "./sign-in/index.module.scss";
import Logo from "@/app/components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FlexContainer dir="row" className={styles.loginHeader}>
        <Logo />
      </FlexContainer>
      {children}
    </>
  );
}
