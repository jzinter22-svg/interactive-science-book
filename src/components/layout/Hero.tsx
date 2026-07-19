import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import styles from "./Hero.module.css";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  primaryAction?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  stats?: HeroStat[];
}

export function Hero({ eyebrow, title, subtitle, primaryAction, secondaryAction, stats }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.glowIndigo} aria-hidden="true" />
      <div className={styles.glowAmber} aria-hidden="true" />

      <div className={styles.content}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h1 className={`text-hero ${styles.title}`}>{title}</h1>
        {subtitle && <p className={`text-body-lg ${styles.subtitle}`}>{subtitle}</p>}

        {(primaryAction || secondaryAction) && (
          <div className={styles.actions}>
            {primaryAction && (
              <Button size="lg" onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>

      {stats && stats.length > 0 && (
        <div className={styles.statRow}>
          {stats.map((stat) => (
            <div className={`glass-surface ${styles.statCard}`} key={stat.label}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
