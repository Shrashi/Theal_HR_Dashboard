"use client";

import React, { useState, useContext } from "react";
import { Wrapper } from "../Wrapper";
import classes from "./index.module.scss";
import Image from "next/image";
import { SideNav } from "./Nav";
import { adminNavItems, noHeaderFooterUrls } from "@/app/constants";
import { usePathname } from "next/navigation";
import { headerNavItems } from "@/app/constants";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { GlobalContext } from "../../../../providers/GlobalProvider";

const SideNavComponent = () => {
  const pathname = usePathname();
  const [userDetails] = useLocalStorage("user", "");
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useContext(GlobalContext);
  const headerItems = user.isAdmin
    ? {
        ...headerNavItems,
        navItems: [...headerNavItems.navItems, ...adminNavItems],
      }
    : headerNavItems;

  console.log("user", user);
  return (
    <nav
      className={[
        classes.header,
        noHeaderFooterUrls.includes(pathname) && classes.hide,
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseOver={() => setOpen(true)}
      onMouseOut={() => setOpen(false)}
    >
      <SideNav header={headerItems} open={open} />
    </nav>
  );
};

export default SideNavComponent;
