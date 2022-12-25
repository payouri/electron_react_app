import { z } from 'zod';
import { tagSchema } from './Tag.zod';

export type Tag = z.infer<typeof tagSchema>;
