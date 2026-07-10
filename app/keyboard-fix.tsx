"use client";

import { useEffect } from "react";

type VirtualKeyboardLike = {
  overlaysContent: boolean;
  boundingRect?: DOMRectReadOnly;
  addEventListener?: (type: "geometrychange", listener: () => void) => void;
  removeEventListener?: (type: "geometrychange", listener: () => void) => void;
};

type NavigatorWithVirtualKeyboard = Navigator & {
  virtualKeyboard?: VirtualKeyboardLike;
};

export default function KeyboardFix() {
  useEffect(() => {
    const root = document.documentElement;
    const nav = navigator as NavigatorWithVirtualKeyboard;
    const virtualKeyboard = nav.virtualKeyboard;

    if (virtualKeyboard) {
      virtualKeyboard.overlaysContent = true;
    }

    const update = () => {
      const vv = window.visualViewport;

      const heightFromVisualViewport = vv
        ? Math.max(0, window.innerHeight - vv.height - vv.offsetTop)
        : 0;

      const heightFromVirtualKeyboard =
        virtualKeyboard?.boundingRect?.height ?? 0;

      const keyboardHeight = Math.max(
        heightFromVisualViewport,
        heightFromVirtualKeyboard
      );

      root.style.setProperty(
        "--keyboard-height",
        `${Math.round(keyboardHeight)}px`
      );
    };

    update();

    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    virtualKeyboard?.addEventListener?.("geometrychange", update);

    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      virtualKeyboard?.removeEventListener?.("geometrychange", update);
      root.style.removeProperty("--keyboard-height");
    };
  }, []);

  return null;
}
