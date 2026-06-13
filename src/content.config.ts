import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const photoSchema = z.object({
  title: z.string(),
  image: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  location: z.string().optional(),
  date: z.coerce.date().optional(),
  album: z.string().optional(),
});

const albumSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  location: z.string().optional(),
  date: z.coerce.date().optional(),
  cover: z.string().optional(),
});

const photos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/photos" }),
  schema: photoSchema,
});

const albums = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/albums" }),
  schema: albumSchema,
});

export const collections = { photos, albums };

export type PhotoData = z.infer<typeof photoSchema>;
export type AlbumData = z.infer<typeof albumSchema>;
