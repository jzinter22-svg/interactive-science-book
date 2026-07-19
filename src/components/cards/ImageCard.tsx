import styles from "./ImageCard.module.css";

interface ImageCardProps {
  src?: string;
  alt: string;
  caption?: string;
}

export function ImageCard({ src, alt, caption }: ImageCardProps) {
  return (
    <figure className={`glass-surface ${styles.card}`}>
      <div className={styles.imageWrap}>
        {src ? (
          <img src={src} alt={alt} className={styles.image} />
        ) : (
          <div className={styles.placeholder} role="img" aria-label={alt} />
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
