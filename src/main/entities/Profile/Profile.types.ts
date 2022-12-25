import { z } from 'zod';
import { profileSchema } from './Profile.zod';

export type Profile = z.infer<typeof profileSchema>;
