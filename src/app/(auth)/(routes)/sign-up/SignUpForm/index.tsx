"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Input } from "@/app/components/Input";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FlexContainer from "@/app/components/FlexContainer";
import styles from "./index.module.scss";
import { Button } from "@/app/components/Button";

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
};

const SignUpForm = () => {
  const signUpSchema = z.object({
    username: z.string().min(6, { message: "Username is required" }),
    email: z
      .string()
      .min(9, { message: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
  });

  type ValidationSignUpSchema = z.infer<typeof signUpSchema>;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<ValidationSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = useCallback(async (data: SignUpFormData) => {
    console.log("data", data);
    setLoading(true);
    try {
      const resp = await axios.post("/api/sign-up", data);
      console.log("response", resp.status);
      if (resp.status === 200) {
        router.push(`/sign-in`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <FlexContainer dir="col" className={styles.signUpFormContainer}>
      <FlexContainer dir="col" className={styles.formWrapper}>
        <h3 className={styles.signUpHeading}>SIGN UP</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <FlexContainer dir="col" className={styles.fieldWrapper}>
            <Input
              name="username"
              label="Username"
              required
              register={register}
              error={errors.username}
              type="text"
              style={{ marginBottom: "10px" }}
            />
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
        <Link href={"/sign-in"} className={styles.signInLink}>
          Already have an account? Login
        </Link>
      </FlexContainer>
    </FlexContainer>
  );
};
export default SignUpForm;
