import shared from "./shared.module.css";
import styles from "./VideoCard.module.css";

interface VideoCardProps {
  title: string;
  duration: string;
  thumbnailSrc?: string;
  onPlay?: () => void;
}

export function VideoCard({ title, duration, thumbnailSrc, onPlay }: VideoCardProps) {
  return (
    <article className={`glass-surface ${styles.card}`}>
      <button type="button" className={styles.thumbnail} onClick={onPlay} aria-label={`تشغيل ${title}`}>
        {thumbnailSrc ? (
          <img src={thumbnailSrc} alt="" className={styles.image} />
        ) : (
          <div className={styles.placeholder} aria-hidden="true" />
        )}
        <span className={styles.playButton}>
          <PlayIcon />
        </span>
        <span className={styles.duration}>{duration}</span>
      </button>
      <div className={styles.body}>
        <span className={`${shared.badge} ${shared.badgeIndigo}`}>فيديو</span>
        <h4 className={shared.title}>{title}</h4>
      </div>
    </article>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}
