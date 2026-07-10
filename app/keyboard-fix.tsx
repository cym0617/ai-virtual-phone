"use client";

import { useEffect } from "react";

export default function KeyboardFix() {
  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      const vv = window.visualViewport;

      if (!vv) return;

      const keyboardHeight = Math.max(
        0,
        window.innerHeight - vv.height - vv.offsetTop
      );

      root.style.setProperty(
        "--keyboard-height",
        `${Math.round(keyboardHeight)}px`
      );

      window.scrollTo(0, 0);
    };

    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);

    update();

    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      root.style.removeProperty("--keyboard-height");
    };
  }, []);

  return null;
}
