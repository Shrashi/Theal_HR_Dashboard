import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "../../../../../providers/GlobalProvider";
import Link from "next/link";
import axios from "axios";
import SignUpForm from "./SignUpForm";

const SignUpFormPage = () => {
  return <SignUpForm />;
};
export default SignUpFormPage;
