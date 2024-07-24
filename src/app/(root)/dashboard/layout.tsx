import SideNavComponent from "../../components/SideNav";
import Header from "../../components/Header";
import classes from "./index.module.scss";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
