const createFontLoader = () => {
  const loadFont = async ({
    name,
    pathToFile,
  }: {
    name: string;
    pathToFile: string;
  }) => {
    const fontFace = new FontFace(name, `url(${pathToFile})`);

    const loadedFont = await fontFace.load();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.fonts.add(loadedFont);

    return loadedFont;
  };

  return { loadFont };
};

export const FontLoader = createFontLoader();
