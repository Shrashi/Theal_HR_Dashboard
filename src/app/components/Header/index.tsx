"use client";
import React, { useState, useContext } from "react";
import classes from "./index.module.scss";
import { Avatar } from "@mui/material";
import Image from "next/image";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { ThemeContext } from "../../../../providers/ThemeProvider";
import Switch from "@mui/material/Switch";
import Logo from "../Logo";

const Header = () => {
  const [userDetails, setUserDetails] = useState<any>();
  const [state] = useLocalStorage("user", undefined, setUserDetails);
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={classes.header}>
      <Logo />
      <div className={classes.iconsWrapper}>
        <div>
          <Avatar
            alt="profile-icon"
            sx={{
              bgcolor: classes.avatarColor,
              margin: "0px 10px",
              color: classes.profileBtnColor,
            }}
          >
            {userDetails?.username?.substring(0, 2)?.toUpperCase()}
          </Avatar>
        </div>
        <div>
          <Switch
            checked={theme === "dark" ? true : false}
            onChange={() => {
              setTheme((prev) => (prev === "dark" ? "light" : "dark"));
            }}
            sx={{
              color:
                theme === "dark"
                  ? classes.btnSecondaryColor
                  : classes.btnPrimaryColor,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
