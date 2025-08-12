'use client';

import React from "react";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text, className, ...props }, ref) => {
  const pathname = usePathname();
  const router = useRouter();
  const language = pathname ? pathname.split("/")[1] : undefined;

  const defaultText = {
    ro: "Galerie",
    en: "Gallery",
    es: "Galeria",
  };

  const routes = {
    ro: "/ro/galerie",
    en: "/en/gallery",
    es: "/es/galeria",
  };

  const buttonText =
    text || defaultText[language as "ro" | "en" | "es"] || "Cere ofertă";

  const handleClick = () => {
    const target = routes[language as "ro" | "en" | "es"];
    if (target) {
      router.push(target);
    } else {
      router.push("/"); // fallback dacă nu e limbă detectată
    }
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={clsx(
        "group relative w-48 cursor-pointer overflow-hidden rounded-full mt-10 border p-2 text-center font-semibold transition-colors duration-300",
        "bg-[var(--primary)] border-[var(--primary)] text-white",
        "hover:bg-[var(--primary-hover)] hover:border-[var(--primary-hover)]",
        className
      )}
      {...props}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {buttonText}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 text-white">
        <span>{buttonText}</span>
        <ArrowRight />
      </div>
      <div className="absolute mx-[-15] left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-[var(--primary-hover)] transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8]"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
