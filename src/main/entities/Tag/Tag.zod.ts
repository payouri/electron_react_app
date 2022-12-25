import { z } from 'zod';
import { TAG_DEFAULT_COLOR } from './Tag.constants';

export const tagSchema = z.object({
  _id: z.string(),
  name: z.string(),
  color: z.string().nullable().default(TAG_DEFAULT_COLOR),
});
