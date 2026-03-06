"use client";

import { useEffect, useState } from "react";

export default function SplashScreen({ logoPath }: { logoPath: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;

    const hide = () => {
      timeoutId = window.setTimeout(() => setHidden(true), 120);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
      timeoutId = window.setTimeout(hide, 1100);
    }

    return () => {
      window.removeEventListener("load", hide);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className="splash-screen" aria-hidden="true">
      <img src={logoPath || "/logo.png"} alt="" />
    </div>
  );
}
