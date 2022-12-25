import { z } from 'zod';
import { itemSchema } from './Item.zod';

export type Item = z.infer<typeof itemSchema>;
