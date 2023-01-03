function elementPicker() {
  let pageNodeId: string | null = null;

  const initPageRootNode = () => {
    if (!pageNodeId) {
      pageNodeId = window.electron.nanoid();
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

    return pageNode;
  };

  const pageNode = initPageRootNode();
  const microAppMountNode = document.createElement('div');
  document.body.appendChild(microAppMountNode);

  window.electron.ipcRenderer.on('IPC_SCRIPTS_CHANNEL', (event, args) => {});
  window.electron.ipcRenderer.sendMessage('IPC_SCRIPTS_CHANNEL', [
    { type: 'elementPicker' },
  ]);

  window.electron.renderReactComponent(
    window.electron.components.InjectedSidebar(),
    microAppMountNode
  );

  console.log('Rendered react component: ', pageNode);
}

export const getElementPickerScript = () => {
  return `(${elementPicker.toString()})();`;
};
