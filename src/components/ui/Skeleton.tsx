import styles from "./Skeleton.module.css";

interface SkeletonProps {
  variant?: "text" | "circle" | "rect";
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({ variant = "rect", width, height, className = "" }: SkeletonProps) {
  return (
    <span
      className={`${styles.skeleton} ${styles[variant]} ${className}`.trim()}
      style={{ inlineSize: width, blockSize: height }}
      aria-hidden="true"
    />
  );
}

export function ChapterCardSkeleton() {
  return (
    <div className={`glass-surface ${styles.chapterCard}`} aria-hidden="true">
      <div className={styles.chapterHeader}>
        <Skeleton variant="rect" width="2.75rem" height="2.75rem" className={styles.roundedLg} />
        <Skeleton variant="text" width="2rem" height="1.5rem" />
      </div>
      <Skeleton variant="text" width="70%" height="1.25rem" />
      <Skeleton variant="text" width="100%" height="0.9rem" />
      <Skeleton variant="text" width="85%" height="0.9rem" />
      <Skeleton variant="rect" width="100%" height="0.5rem" className={styles.roundedFull} />
    </div>
  );
}

export function LessonCardSkeleton() {
  return (
    <div className={`glass-surface ${styles.lessonCard}`} aria-hidden="true">
      <Skeleton variant="circle" width="2.25rem" height="2.25rem" />
      <div className={styles.lessonBody}>
        <Skeleton variant="text" width="60%" height="1rem" />
        <Skeleton variant="text" width="35%" height="0.8rem" />
      </div>
    </div>
  );
}
