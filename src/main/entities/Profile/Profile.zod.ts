import { z } from 'zod';

export const profileSchema = z.object({
  _id: z.string(),
  name: z.string(),
  note: z.string().nullable(),
});
