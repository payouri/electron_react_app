import { z } from 'zod';
import { tagSchema } from '../Tag/Tag.zod';

export const itemSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().optional(),
  urls: z.array(z.string()).optional().default([]),
  tags: z.array(tagSchema),
});
