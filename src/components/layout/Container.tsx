import type { ElementType, ReactNode } from "react";
import styles from "./Container.module.css";

type ContainerSize = "sm" | "md" | "reading" | "xl";

interface ContainerProps {
  as?: ElementType;
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
}

const sizeClass: Record<ContainerSize, string> = {
  sm: "container--sm",
  md: "container--md",
  reading: "container--reading",
  xl: "",
};

export function Container({ as: Tag = "div", size = "xl", className = "", children }: ContainerProps) {
  return (
    <Tag className={`container ${sizeClass[size]} ${styles.container} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
