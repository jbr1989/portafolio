import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const project = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/project" }),
  schema: z.object({
    img: z.string(),
    title: z.string(),
    repository: z.string(),
    code: z.string(),
    link: z.string().default(''),
    type: z.array(z.string()),
    descr: z.string(),
    technologies: z.array(z.string()),
  }),
});

const links = defineCollection({
  loader: file("src/content/links.json"),
  schema: z.object({
    text: z.string(),
    icon: z.string(),
    link: z.string(),
    styles: z.string().optional(),
  }),
});

export const collections = { project, links };
