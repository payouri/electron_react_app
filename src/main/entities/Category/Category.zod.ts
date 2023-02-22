import { z } from 'zod';

export const categorySchema = z.object({
  _id: z.string(),
  name: z.string(),
});
