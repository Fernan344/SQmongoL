import React, { useState, useRef } from 'react';
import { useStateContext } from "../hooks/useSQML";

function CustomFileInput({reference}) {

    const {
        openFile
    } = useStateContext();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
  
        reader.onload = (event) => {
          const content = event.target.result;
          const fileName = file.name;
          openFile(fileName, content)
        };
  
        reader.readAsText(file);
    }
  };

  return (
    <div className="custom-file-input">
        <label for="upload-photo" id="upload-photo-label" style={{position: 'absolute'}}>
        </label>
        <input
            type="file"
            id="upload-photo"
            accept=".sql, .txt, .sqml"
            ref={reference} // Asigna la referencia al elemento input
            onChange={handleFileChange}
        />
    </div>
  );
}

export default CustomFileInput;