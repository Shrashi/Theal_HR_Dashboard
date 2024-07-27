"use client";

import React, {
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useEffect,
  useState,
} from "react";

export const initialThemeState = {
  theme: `dark`,
  setTheme: (() => null) as Dispatch<SetStateAction<string>>,
};

export const ThemeContext = React.createContext(initialThemeState);

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(initialThemeState.theme);

  const localStorage = globalThis.window?.localStorage;

  useEffect(() => {
    const savedThemeLocal = localStorage.getItem(`globalTheme`);

    if (!!savedThemeLocal) {
      setTheme(savedThemeLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`globalTheme`, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`theme--${theme}`}
        style={{ width: "100%", minHeight: "100vh" }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
