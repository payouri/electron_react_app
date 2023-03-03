export type LinkElementResult = {
  href: string;
  text: string;
  node: HTMLAnchorElement;
};
export type ImageElementResult = {
  src: string;
  alt: string;
  node: HTMLImageElement;
};
export type NumberElementResult = {
  number: number;
  node: HTMLElement;
};
export type TextElementResult = {
  text: string;
  node: HTMLElement;
};

export type ElementResultByType = {
  image: ImageElementResult;
  link: LinkElementResult;
  text: TextElementResult;
  number: NumberElementResult;
};

export const isLink = (target: unknown): target is HTMLAnchorElement =>
  target instanceof HTMLAnchorElement;

export const isImage = (target: unknown): target is HTMLImageElement =>
  target instanceof HTMLImageElement;

export const isNumber = (target: unknown): target is HTMLElement =>
  target instanceof HTMLElement &&
  !Number.isNaN(
    Number(
      target.textContent
        ?.replace(',', '.')
        .split('.')
        .map((t) => t.trim())
        .join('') || ''
    )
  );

export const isText = (target: unknown): target is HTMLElement =>
  (target instanceof HTMLElement &&
  target.innerText?.trim().length &&
  target?.children.length === 0
    ? target
    : null) !== null;

export function processImage(
  element: HTMLImageElement
): ElementResultByType['image'] {
  return {
    src: element.src,
    alt: element.alt,
    node: element,
  };
}

export function processLink(
  element: HTMLAnchorElement
): ElementResultByType['link'] {
  return {
    href: element.href,
    text: element.innerText,
    node: element,
  };
}

export function processText(element: HTMLElement): ElementResultByType['text'] {
  return {
    text: element?.textContent || '',
    node: element,
  };
}

export function processNumber(
  element: HTMLElement
): ElementResultByType['number'] {
  return {
    number: parseFloat(
      element?.textContent
        ?.replace(',', '.')
        .split('.')
        .map((t) => t.trim())
        .join('') || ''
    ),
    node: element,
  };
}

export type ElementPickerProps = {
  elementType: keyof ElementResultByType;
};
