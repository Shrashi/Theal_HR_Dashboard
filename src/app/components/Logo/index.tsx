import React from "react";
import FlexContainer from "../FlexContainer";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import styles from "./index.module.scss";

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <FlexContainer dir="row">
        <SpaOutlinedIcon />
        <div className={styles.logoText}>THEAL</div>
      </FlexContainer>
    </div>
  );
};

export default Logo;
