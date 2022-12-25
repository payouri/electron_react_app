import { FontLoader } from 'renderer/lib/FontLoader';
import InterLoadURL from 'renderer/assets/fonts/inter/inter.ttf';

const fonts = [
  {
    name: 'Inter',
    path: InterLoadURL,
  },
];

export const loadFonts = async () => {
  await Promise.all(
    fonts.map(async ({ name, path }) => {
      await FontLoader.loadFont({
        name,
        pathToFile: path,
      });
    })
  );
};
