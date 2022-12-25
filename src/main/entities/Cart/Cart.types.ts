import { z } from 'zod';
import { cartSchema } from './Cart.zod';

export type Cart = z.infer<typeof cartSchema>;
