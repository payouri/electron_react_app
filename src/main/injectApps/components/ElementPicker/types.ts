export type ElementResultByType = {
  image: {
    src: string;
    alt: string;
    node: HTMLImageElement;
  };
  link: {
    href: string;
    text: string;
    node: HTMLAnchorElement;
  };
  text: {
    text: string;
    node: HTMLElement;
  };
  number: {
    number: number;
    node: HTMLElement;
  };
};

export type ElementPickerProps = {
  elementType: keyof ElementResultByType;
};
