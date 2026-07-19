import type { ContentBlock } from "../../content/types";
import { ContentBlockList } from "./BlockRenderer";
import styles from "./SectionBlock.module.css";

interface SectionBlockProps {
  title: string;
  blocks: ContentBlock[];
}

export function SectionBlock({ title, blocks }: SectionBlockProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <ContentBlockList blocks={blocks} />
    </section>
  );
}
