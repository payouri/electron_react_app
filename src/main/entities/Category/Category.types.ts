import { z } from 'zod';
import { categorySchema } from './Category.zod';

export type Category = z.infer<typeof categorySchema>;
