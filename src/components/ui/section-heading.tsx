import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-4 text-4xl font-semibold leading-[1.05] text-leaf-dark sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <div className="mt-5 text-base leading-7 text-muted sm:text-lg">{description}</div>
      ) : null}
    </div>
  );
}

