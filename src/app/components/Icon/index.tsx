import React from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface IconComponentProps extends SvgIconProps {
  icon: React.ElementType;
}

const IconComponent: React.FC<IconComponentProps> = ({
  icon: Icon,
  ...props
}) => {
  return <Icon {...props} />;
};

export default IconComponent;
