import { MemoryDb } from 'minimongo';
import { customAlphabet } from 'nanoid';

const generator = customAlphabet('1234567890ABCDEF', 24);

export const generateUniqueDbItemId = (
  data: MemoryDb['collections'][string]
): string => {
  let id = generator();

  while (id in data) {
    id = generator();
  }

  return id;
};
