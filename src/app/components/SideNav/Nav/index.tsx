"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header as HeaderType } from "../../../../payload/payload-types";
// import StyledLink from "../../StyledLink"
import classes from "./index.module.scss";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { ThemeContext } from "../../../../../providers/ThemeProvider";
import { useContext } from "react";
import IconComponent from "../../Icon";

export const SideNav: React.FC<{ header: HeaderType; open: Boolean }> = ({
  header,
  open,
}) => {
  const navItems = header?.navItems || [];
  const [userDetails, setUserDetails] = useState();
  const { theme, setTheme } = useContext(ThemeContext);

  const [state] = useLocalStorage("user", undefined, setUserDetails);

  return (
    <nav
      className={[classes.nav, userDetails === "" && classes.hide]
        .filter(Boolean)
        .join(" ")}
    >
      {navItems.map(({ link, id }, i) => {
        return (
          <Link href={`${link.url}`} key={id} className={classes.iconLink}>
            <div className={classes.flexItem}>
              <IconComponent
                icon={link.icon}
                sx={{
                  color:
                    theme == "dark"
                      ? classes.btnSecondaryColor
                      : classes.btnPrimaryColor,
                }}
                fontSize="small"
              />
              {open && (
                <div
                  className={[classes.iconLabel, open && classes.show]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {link.label}
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
};
