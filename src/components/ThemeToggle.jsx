import React from "react";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "1px solid var(--border-color)",
        borderRadius: "20px",
        padding: "5px 15px",
        color: "var(--text-bright)",
        cursor: "pointer",
        fontFamily: "Heebo, sans-serif",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.3s ease",
        marginLeft: "20px",
      }}
      className="theme-toggle"
    >
      <i className={theme === "dark" ? "ri-sun-line" : "ri-moon-line"}></i>
      {theme === "dark" ? "LIGHT MODE" : "DARK MODE"}
    </button>
  );
};

export default ThemeToggle;
