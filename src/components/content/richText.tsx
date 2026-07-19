import type { RichText } from "../../content/types";

/** Normalizes a RichText (string | string[]) into one <p> per paragraph. */
export function RichTextParagraphs({ body, className }: { body: RichText; className?: string }) {
  const paragraphs = Array.isArray(body) ? body : [body];
  return (
    <>
      {paragraphs.map((p, i) => (
        <p className={className} key={i}>
          {p}
        </p>
      ))}
    </>
  );
}
