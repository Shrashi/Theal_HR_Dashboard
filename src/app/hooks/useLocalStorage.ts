"use client";

import { useState, useEffect } from "react";

export const useLocalStorage = (
  key: string,
  initialValue: any,
  setter?: (v: any) => void
) => {
  const [state, setState] = useState(() => {
    try {
      let value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (err) {
      console.log("error in accessing local storage key", err);
    }
  });

  if (typeof setter === "function") {
    useEffect(() => {
      setter(state);
    }, []);
  }

  const setValue: (value: any) => void = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(value);
    } catch (error) {
      console.log("error in setting the value", error);
    }
  };

  return [state, setValue];
};
