"use client";

import { useEffect } from "react";

export default function KeyboardFix() {
  useEffect(() => {
    const updateLayout = () => {
      if (window.visualViewport) {
        const visibleHeight = window.visualViewport.height;
        document.documentElement.style.height = `${visibleHeight}px`;
        document.body.style.height = `${visibleHeight}px`;
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateLayout);
      window.visualViewport.addEventListener("scroll", updateLayout);
      updateLayout();
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateLayout);
        window.visualViewport.removeEventListener("scroll", updateLayout);
      }
    };
  }, []);

  return null;
}
