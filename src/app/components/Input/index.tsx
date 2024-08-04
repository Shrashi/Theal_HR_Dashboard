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
  value?: any;
  type?: "text" | "number" | "password" | "email" | "date";
  validate?: (value: string) => boolean | string;
  handleChange?: (e: React.SyntheticEvent) => void;
  disabled?: boolean;
  style?: CSSProperties;
  valueAsNumber?: boolean;
};

export const Input: React.FC<Props> = ({
  name,
  label,
  required,
  placeholder,
  register,
  value,
  error,
  type = "text",
  validate,
  disabled,
  minLength,
  handleChange,
  maxLength,
  style,
  valueAsNumber,
}) => {
  console.log("val", value);
  return (
    <div className={classes.inputWrap}>
      <label htmlFor="name" className={classes.label}>
        {label}
        {required ? <span className={classes.asterisk}>&nbsp;*</span> : ""}
      </label>
      <input
        style={style}
        className={[
          classes.input,
          error && classes.error,
          type === "number" && classes.removeArrow,
        ]
          .filter(Boolean)
          .join(" ")}
        {...{ type }}
        {...register(name, {
          required,
          ...(typeof handleChange === "function" && {
            onChange: (e) => {
              handleChange(e);
            },
          }),
          ...(value && {
            value: value,
          }),
          minLength,
          maxLength,
          validate,
          ...(valueAsNumber && {
            valueAsNumber: valueAsNumber,
          }),
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
