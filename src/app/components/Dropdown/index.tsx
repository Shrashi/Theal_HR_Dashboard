"use client";

import * as React from "react";
import styles from "./index.module.scss";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

interface IDropdownItem {
  id: string;
  label: string;
  name: string;
}

interface IProps {
  items?: IDropdownItem[];
  selected: string | null;
  setSelected: (value: string) => void;
  freeSolo?: Boolean;
  style?: React.CSSProperties;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

const dropdownItems = [
  {
    id: "1",
    label: "myLink",
    name: "option",
  },
  {
    id: "2",
    label: "myLink2",
    name: "option2",
  },
  {
    id: "3",
    label: "myLink3",
    name: "option3",
  },
  {
    id: "4",
    label: "myLink4",
    name: "option4",
  },
];

const Dropdown = ({
  items = dropdownItems,
  selected,
  setSelected,
  freeSolo,
  style,
  label,
  required,
  placeholder,
}: IProps) => {
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOptions, setDropdownOptions] = React.useState(items);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
    if (dropdownOptions.length === 0 && !freeSolo) {
      setSelected("");
      setDropdownOptions(dropdownItems);
    }
  });

  const keyHandler = (event: React.KeyboardEvent) => {
    if (isOpen) {
      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown":
          if (activeIndex === dropdownOptions.length - 1) return;
          setActiveIndex((prev) => prev + 1);
          break;
        case "ArrowUp":
          if (activeIndex === 0) return;
          setActiveIndex((prev) => prev - 1);
          break;
        case "Enter":
          const selectedItem = dropdownOptions[activeIndex];
          setSelected(selectedItem.name);
          setIsOpen(false);
          break;
      }
    }
  };

  const focusHandler = (index: number) => {
    setActiveIndex(index);
  };
  const handleChangeOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);

    setDropdownOptions(
      items.filter((ele) => ele.name.startsWith(e.target.value))
    );
  };

  const renderOptions = () => {
    let component;
    if (dropdownOptions.length) {
      component = dropdownOptions.map((item, index) => (
        <li
          key={item.id}
          style={{
            backgroundColor:
              item.name === selected || index === activeIndex
                ? styles.selectedItemColor
                : styles.unSelectedItemColor,
          }}
        >
          <a
            href={item.label || ""}
            onFocus={() => focusHandler(index)}
            onClick={(e) => {
              e.preventDefault();
              setSelected(item.name);
              setIsOpen(false);
              setActiveIndex(index);
            }}
          >
            {item.name}
          </a>
        </li>
      ));
    } else if (!freeSolo) {
      component = <li key="not found"> No Options Found</li>;
    }
    return component;
  };

  return (
    <div className={styles.dropdownWrapper}>
      {label && (
        <label htmlFor="name">
          {label}
          {required ? <span>&nbsp;*</span> : ""}
        </label>
      )}
      <div className={styles.dropdownContainer} ref={dropdownRef} style={style}>
        <div className={styles.inputWrapper} onClick={handleClick}>
          <input
            aria-haspopup="true"
            aria-controls="dropdown1"
            placeholder={placeholder || "Select Value"}
            className={styles.input}
            onChange={handleChangeOptions}
            onKeyDown={keyHandler}
            value={selected ? selected : ""}
            style={{ ...style, width: "100%" }}
          />
          <KeyboardArrowDownOutlinedIcon className={styles.arrow} />
        </div>
        <ul
          id="dropdown1"
          role="list"
          className={[styles.dropdownList, isOpen && styles.active]
            .filter(Boolean)
            .join("")}
        >
          {renderOptions()}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
