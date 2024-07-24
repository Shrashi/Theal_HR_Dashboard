"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { getPayload } from "../../../../../utils/token";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { GlobalContext } from "../../../../../providers/GlobalProvider";

const Page = () => {
  const router = useRouter();
  const [, setValue] = useLocalStorage("user", "");
  const { user, setUser } = useContext(GlobalContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user?.email?.length > 0 && user?.password?.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onSubmit = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data, status } = await axios.post("/api/sign-in", user);
      console.log("response", data, status);
      if (status === 200) {
        setUser(data.user);
        setValue(getPayload(data.token));
        router.push(`/dashboard`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <label htmlFor={"email"}>Email</label>
      <input
        type={"text"}
        id={"email"}
        placeholder={"Email"}
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor={"password"}>Password</label>
      <input
        type={"password"}
        id={"password"}
        placeholder={"Password"}
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={onSubmit} disabled={buttonDisabled}>
        {loading ? "Loading" : "Login"}
      </button>
      <Link href={"/sign-up"}>Don't have an account? Sign Up</Link>
    </div>
  );
};
export default Page;
