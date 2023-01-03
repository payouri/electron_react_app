import { customAlphabet } from 'nanoid';

const generateId = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10);

let pageNodeId: string | null = null;

export const initRootPageNode = () => {
  if (!pageNodeId) {
    pageNodeId = generateId();
  }

  const existingPageNode = document.querySelector(`#${pageNodeId}`);

  if (existingPageNode) {
    return existingPageNode;
  }

  const pageNode = document.createElement('div');

  pageNode.id = pageNodeId;

  Array.from(document.body.children).forEach((child) => {
    pageNode.appendChild(child);
  });

  document.body.replaceChildren(pageNode);

  document.body.style.display = 'grid';
  document.body.style.gridTemplateColumns = 'auto';
  document.body.style.gridTemplateRows = 'auto 1fr';

  return pageNode;
};
