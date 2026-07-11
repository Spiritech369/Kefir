"use client";

import { X } from "lucide-react";
import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  variant?: "center" | "drawer";
  size?: "md" | "lg" | "xl";
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  variant = "center",
  size = "lg",
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const initial = panel?.querySelector<HTMLElement>(focusableSelector);
    window.requestAnimationFrame(() => initial?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("hidden"));

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  const handleBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const sizeClass = {
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  }[size];

  return (
    <div
      className={`fixed inset-0 z-[100] flex bg-leaf-dark/55 p-0 backdrop-blur-[3px] ${
        variant === "drawer" ? "justify-end" : "items-end justify-center sm:items-center sm:p-5"
      }`}
      onMouseDown={handleBackdrop}
      role="presentation"
    >
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className={`${
          variant === "drawer"
            ? "h-full w-full max-w-md rounded-none"
            : `max-h-[94dvh] w-full ${sizeClass} rounded-t-[2rem] sm:rounded-[2rem]`
        } flex flex-col overflow-hidden border border-white/50 bg-milk shadow-2xl`}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
          <div>
            <h2 className="text-2xl font-semibold text-leaf-dark" id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>
          <button
            aria-label={`Cerrar ${title.toLowerCase()}`}
            className="button-ghost -mr-2 !min-h-11 !w-11 !p-0"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={21} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

