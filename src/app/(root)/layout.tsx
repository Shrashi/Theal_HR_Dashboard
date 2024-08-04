import SideNavComponent from "../components/SideNav";
import Header from "../components/Header";
import classes from "./index.module.scss";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.dashboardContainer}>
        <SideNavComponent />
        <div className={classes.innerContainer}> {children}</div>
      </div>
    </div>
  );
}
