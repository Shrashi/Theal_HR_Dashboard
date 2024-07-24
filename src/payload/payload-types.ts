import React from "react";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";


export interface Header {
    navItems?:
      | {
          link: {
            newTab?: boolean | null;
            url?: string | null;
            label: string;
            icon: React.ElementType
          };
          id: string | null;
        }[]
      | null;
  }