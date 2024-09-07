import React from "react";
import styles from "../styles/themeToggle.module.css";

const ThemeToggle = ({ setTheme }) => {
  const toggleTheme = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className={styles.wrapper}>
      <span>☀️</span>
      <label className={styles.toggle} htmlFor="checkbox">
        <input
          className="hidden"
          type="checkbox"
          id="checkbox"
          onChange={toggleTheme}
        />
        <div className={`${styles.slider} ${styles.round}`}></div>
      </label>
      <span>🌒</span>
    </div>
  );
};

export default ThemeToggle;
