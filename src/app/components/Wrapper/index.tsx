import React, { forwardRef, Ref } from "react";

import classes from "./index.module.scss";

type Props = {
  left?: boolean;
  right?: boolean;
  className?: string;
  children: React.ReactNode;
  ref?: Ref<HTMLDivElement>;
};

export const Wrapper = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { left = true, right = true, className, children } = props;

  return (
    <div
      ref={ref}
      className={[
        classes.wrapper,
        left && classes.wrapperLeft,
        right && classes.wrapperRight,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
});

Wrapper.displayName = "Wrapper";
