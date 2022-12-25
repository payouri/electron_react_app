import { z } from 'zod';
import { itemSchema } from '../Item/Item.zod';

export const cartSchema = z.object({
  _id: z.string(),
  name: z.string(),
  items: z.array(itemSchema),
});
