// ============================================================
// CONTENT REGISTRY
//
// The only place pages talk to content. Nothing in src/pages ever
// imports a chapter data file directly — it asks this module.
//
// To add a real chapter later: write a file that exports a `Chapter`
// (see ./types.ts) and add it to `chapters` below. Every page — home
// grid, chapter overview, lesson reader, sidebar nav, prev/next — picks
// it up automatically. No component in src/components ever needs to
// change.
// ============================================================

import type { Chapter, Lesson } from "./types";
import { chapter1 } from "./chapters/c1";

const chapters: Chapter[] = [chapter1];

export function getAllChapters(): Chapter[] {
  return chapters;
}

export function getChapterById(id: string | undefined): Chapter {
  return chapters.find((c) => c.id === id) ?? chapters[0];
}

export interface LessonLookup {
  chapter: Chapter;
  lesson: Lesson;
  /** Zero-based position of this lesson within its chapter — used for prev/next nav. */
  index: number;
}

export function getLessonById(id: string | undefined): LessonLookup {
  for (const chapter of chapters) {
    const index = chapter.lessons.findIndex((l) => l.id === id);
    if (index !== -1) return { chapter, lesson: chapter.lessons[index], index };
  }
  return { chapter: chapters[0], lesson: chapters[0].lessons[0], index: 0 };
}

export interface SidebarNavSection {
  id: string;
  title: string;
  items: { id: string; label: string; href: string }[];
}

export function getSidebarNavSections(): SidebarNavSection[] {
  return chapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    items: chapter.lessons.map((lesson) => ({
      id: lesson.id,
      label: lesson.title,
      href: `/lesson/${lesson.id}`,
    })),
  }));
}
