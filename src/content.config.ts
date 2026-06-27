import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

export const collections = { project }
