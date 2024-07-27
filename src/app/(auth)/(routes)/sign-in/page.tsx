import { Fragment } from "react";
import SignInForm from "./SignInForm";
import FlexContainer from "@/app/components/FlexContainer";
import styles from "./index.module.scss";

export default async function SignIn() {
  return (
    <>
      <SignInForm />
    </>
  );
}
