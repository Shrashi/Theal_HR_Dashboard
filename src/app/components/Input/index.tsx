import React, { CSSProperties } from "react";
import { FieldValues, UseFormRegister, Validate } from "react-hook-form";

import classes from "./index.module.scss";

type Props = {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues & any>;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  error: any;
  type?: "text" | "number" | "password" | "email";
  validate?: (value: string) => boolean | string;
  disabled?: boolean;
  style?: CSSProperties;
};

export const Input: React.FC<Props> = ({
  name,
  label,
  required,
  placeholder,
  register,
  error,
  type = "text",
  validate,
  disabled,
  minLength,
  maxLength,
  style,
}) => {
  return (
    <div className={classes.inputWrap}>
      <label htmlFor="name" className={classes.label}>
        {label}
        {required ? <span className={classes.asterisk}>&nbsp;*</span> : ""}
      </label>
      <input
        style={style}
        className={[classes.input, error && classes.error]
          .filter(Boolean)
          .join(" ")}
        {...{ type }}
        {...register(name, {
          required,
          minLength,
          maxLength,
          validate,
          ...(type === "email"
            ? {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email",
                },
              }
            : {}),
        })}
        disabled={disabled}
        placeholder={placeholder}
      />
      {error && (
        <div className={classes.errorMessage}>
          {!error?.message && error?.type === "required"
            ? "This field is required"
            : error?.message}
        </div>
      )}
    </div>
  );
};
