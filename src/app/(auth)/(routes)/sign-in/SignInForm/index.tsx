"use client";
import { useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { getPayload } from "../../../../../../utils/token";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { GlobalContext } from "../../../../../../providers/GlobalProvider";
import { useForm } from "react-hook-form";
import { Input } from "@/app/components/Input";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FlexContainer from "@/app/components/FlexContainer";
import styles from "./index.module.scss";
import { Button } from "@/app/components/Button";
import employees from "../../../../../../public/assets/images/employees.jpg";
import Image from "next/image";

type SignInFormData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const signInSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
  });

  type ValidationSignInSchema = z.infer<typeof signInSchema>;

  const router = useRouter();
  const [, setValue] = useLocalStorage("user", "");
  const { user, setUser } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<ValidationSignInSchema>({ resolver: zodResolver(signInSchema) });

  const onSubmit = useCallback(async (data: SignInFormData) => {
    console.log("data", data);
    setLoading(true);
    try {
      const { data: userData, status } = await axios.post("/api/sign-in", data);
      console.log("response", userData, status);
      if (status === 200) {
        setUser(userData.user);
        setValue(getPayload(userData.token));
        router.push(`/dashboard`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <FlexContainer dir="row" className={styles.signInFormContainer}>
      <div className={styles.imageWrapper}>
        <Image
          alt="employees"
          src={employees}
          style={{ objectFit: "cover", width: "100%", height: "60%" }}
        />
      </div>
      <FlexContainer dir="col" className={styles.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <FlexContainer dir="col" className={styles.fieldWrapper}>
            <Input
              name="email"
              label="Email Address"
              required
              register={register}
              error={errors.email}
              type="email"
              style={{ marginBottom: "10px" }}
            />
            <Input
              name="password"
              label="Password"
              required
              register={register}
              error={errors.password}
              minLength={5}
              type="password"
            />
          </FlexContainer>
          <Button
            disabled={isLoading}
            type="submit"
            appearance="primary"
            className={styles.submitBtn}
          >
            Submit
          </Button>
        </form>
        <Link href={"/sign-up"} className={styles.signUpLink}>
          Don't have an account? Sign Up
        </Link>
      </FlexContainer>
    </FlexContainer>
  );
};
export default SignInForm;
