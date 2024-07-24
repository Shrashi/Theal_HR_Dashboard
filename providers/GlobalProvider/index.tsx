"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Cookies from "js-cookie";

export const initialUserFormData = {
  email: "",
  password: "",
  username: "",
  isVerified: false,
  isAdmin: false,
};

export const initialEmployeeDetail = {
  firstName: "",
  lastName: "",
  email: "",
  ctc: {
    variable: 0,
    fixed: 0,
  },
  gender: "",
  hiredOn: "",
  terminatedOn: "",
  address: {
    street: "",
    city: "",
    state: "",
    pincode: 0,
  },
  country: "",
  monthlyCompensation: 0,
  trainingCompletion: false,
  trainingCost: 0,
  trainingHrs: 0,
  trainingPrograms: [""],
  department: "",
  age: 0,
  role: "",
  satisfactionScore: 0,
  ethnicity: "",
  inManagement: false,
  tenure: 0,
  rating: 0,
};
const protectedRoutes: string[] = [
  "dashboard",
  "performance",
  "development",
  "demographics",
  "diversity",
  "women",
  "salary-comparison",
];

const protectedAdminRoutes: string[] = [
  "/admin/employees",
  "/admin/employee",
  "/admin/update-password",
];

export type EmployeeDetail = {
  firstName: string;
  lastName: string;
  email: string;
  ctc: {
    variable: number;
    fixed: number;
  };
  gender: string;
  hiredOn: string;
  terminatedOn: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: number;
  };
  country: string;
  monthlyCompensation: number;
  trainingCompletion: boolean;
  trainingCost: number;
  trainingHrs: number;
  trainingPrograms: string[];
  department: string;
  age: number;
  role: string;
  satisfactionScore: number;
  ethnicity: string;
  inManagement: boolean;
  tenure: number;
  rating: number;
};

type userType = {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
};

export const initialGlobalState = {
  showNavModal: false,
  setShowNavModal: (() => null) as Dispatch<SetStateAction<boolean>>,
  pageLevelLoader: true,
  setPageLevelLoader: (() => null) as Dispatch<SetStateAction<boolean>>,
  isAuthUser: false,
  setIsAuthUser: (() => null) as Dispatch<SetStateAction<boolean>>,
  user: initialUserFormData,
  setUser: (() => null) as Dispatch<
    SetStateAction<{
      email: string;
      password: string;
      username: string;
      isVerified: boolean;
      isAdmin: boolean;
    }>
  >,
  componentLevelLoader: { loading: false, id: "" },
  setComponentLevelLoader: (() => null) as Dispatch<
    SetStateAction<{ loading: boolean; id: string }>
  >,
  employeeDetail: initialEmployeeDetail,
  setEmployeeDetail: (() => null) as Dispatch<SetStateAction<EmployeeDetail>>,
  employeeData: [{}],
  setEmployeeData: (() => null) as Dispatch<SetStateAction<EmployeeDetail[]>>,
};

export const GlobalContext = createContext(initialGlobalState);

export default function GlobalState({ children }: { children: ReactNode }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(true);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState<boolean>(false);
  const [user, setUser]: [userType, Dispatch<SetStateAction<userType>>] =
    useState<userType>(initialUserFormData);

  const [employeeDetail, setEmployeeDetail]: [
    EmployeeDetail,
    Dispatch<SetStateAction<EmployeeDetail>>
  ] = useState<EmployeeDetail>(initialEmployeeDetail);
  const [employeeData, setEmployeeData]: [
    EmployeeDetail[],
    Dispatch<SetStateAction<EmployeeDetail[]>>
  ] = useState<EmployeeDetail[]>([]);

  const router = useRouter();
  const pathName: string = usePathname();
  console.log("pathname", pathName);
  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userDetails = JSON.parse(localStorage.getItem("user") || "");
      setUser(userDetails);
    } else {
      setIsAuthUser(false);
      setUser(initialUserFormData); //unauthenticated user
    }
  }, [Cookies]);

  useEffect(() => {
    if (
      pathName !== "/sign-in" &&
      user &&
      Object.keys(user).length === 0 &&
      protectedRoutes.includes(pathName)
    )
      router.push("/sign-in");
  }, [user, pathName]);

  useEffect(() => {
    if (
      user !== null &&
      user &&
      Object.keys(user).length > 0 &&
      !user?.isAdmin &&
      protectedAdminRoutes.includes(pathName)
    )
      router.push("/unauthorized-page");
  }, [user, pathName]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLevelLoader,
        setPageLevelLoader,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
        employeeDetail,
        setEmployeeDetail,
        employeeData,
        setEmployeeData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
