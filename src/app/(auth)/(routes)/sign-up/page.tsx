"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "../../../../../providers/GlobalProvider";
import Link from "next/link";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(GlobalContext);
  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  //   username: "",
  //   isVerified: false,
  //   isAdmin: false,
  // });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onSubmit = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("/api/sign-up", user);
      if (response.status === 200) {
        router.push("/sign-in");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <label htmlFor={"username"}>Username</label>
      <input
        type={"text"}
        id={"username"}
        placeholder={"Username"}
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
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
        {loading ? "Loading.." : "Sign Up"}
      </button>
      <Link href={"/sign-in"}>Already have an account? Login</Link>
    </div>
  );
};
export default Page;
