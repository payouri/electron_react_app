/* eslint-disable no-restricted-syntax */
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

  pageNode.style.position = 'absolute';

  document.body.append(pageNode);

  return pageNode;
};
