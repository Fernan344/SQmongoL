import React from 'react';
import { useStateContext } from "../hooks/useSQML";

function CreateFile({reference, name, ext}) {
    const {
        tabs, activeIndex, traduction
    } = useStateContext();

  const createAndDownloadFile = () => {
    const activeTab = tabs[activeIndex]
    const currentNames = activeTab.title.split(".");
    const content = (ext === 'js' ? traduction : activeTab.content) || "";
    const blob = new Blob([content], { type: 'text/plain' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    const newName = name || currentNames.filter((_, index) => index < currentNames.length - 1).join(".") || 'New File'
    const newExt = ext || (currentNames.length > 1 ? currentNames[currentNames.length - 1] : 'sql')

    a.href = url;
    a.download = `${newName}.${newExt}`; 
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={createAndDownloadFile} ref={reference} style={{position: 'absolute'}}></button>
    </div>
  );
}

export default CreateFile;