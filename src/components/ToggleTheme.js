import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const DARK_CLASS = "dark";

const ToggleTheme = () => {
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (prefersDark) => {
      setIsDark(prefersDark);
    }
  );

  const [isDark, setIsDark] = useState(systemPrefersDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }, [isDark]);
  return (
    <div className="dark-mode-container">
      <label className="switch">
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleTheme;
