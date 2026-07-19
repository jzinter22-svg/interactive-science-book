import type { ReactNode } from "react";
import shared from "./shared.module.css";
import styles from "./ExampleCard.module.css";

interface ExampleCardProps {
  label?: string;
  title: string;
  children: ReactNode;
}

export function ExampleCard({ label = "مثال", title, children }: ExampleCardProps) {
  return (
    <article className={`glass-surface-strong ${shared.card} ${styles.card}`}>
      <span className={`${shared.badge} ${shared.badgeTeal}`}>{label}</span>
      <h4 className={shared.title}>{title}</h4>
      <div className={`text-body ${styles.body}`}>{children}</div>
    </article>
  );
}
