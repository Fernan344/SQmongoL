import React, { useEffect, useRef, useState  } from "react";
import Editor from "@monaco-editor/react";
import ActionsBar from "./ActiosnsBar"
import FilesBar from "./FIlesBar"
import { useStateContext } from "../hooks/useSQML";

function EditorCustom(props) {
    const editorRef = useRef(null);
    const traductionRef = useRef(null);
    const [ isHandlerDragging, setHandlerDragging ] = useState(false);
    const {
        text, tabs, activeIndex, 
        setEditor, traduction, handleTabChange,
        handleClickGetAll,
        handleClickGetSelected,
        handleChangeCode
    } = useStateContext()

    useEffect(() => {
        if(activeIndex === -1 && !tabs.length) handleTabChange(undefined, 0, 'noData')
        else if(activeIndex === -1 && tabs.length) handleTabChange(undefined, 0, 'elimination')
        else handleTabChange(undefined, -1, 'change')
    }, [tabs])    

    const editorDidMount = (editor, monaco) => {
        editorRef.current = editor;       
    }

    const traductionEditorDidMount = (editor, monaco) => {
        traductionRef.current = editor;
    } 

    const handlerMouseMove = (e) => {
        var handler = document.querySelector('.handler');
        var wrapper = handler.closest('.wrapper');
        var boxA = wrapper.querySelector('.boxA');
        var boxB = wrapper.querySelector('.boxB');
        // Don't do anything if dragging flag is false
        if (!isHandlerDragging) {
            return false;
        }
        
        // Get offset
        var containerOffsetLeft = wrapper.offsetLeft;
        
        // Get x-coordinate of pointer relative to container
        var pointerRelativeXpos = e.clientX - containerOffsetLeft;
        
        // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
        var boxAminWidth = 60;
        
        // Resize box A
        // * 8px is the left/right spacing between .handler and its inner pseudo-element
        // * Set flex-grow to 0 to prevent it from growing
        boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 8)) + 'px';
        const boxBWidth = 1100 - boxA.style.width.split("px")[0];
        boxB.style.width = boxBWidth + 'px';
        boxA.style.flexGrow = 0;
    }

    const handlerMouseUp = (e) => {
        setHandlerDragging(false);
    }

    const handlerMouseDown = (e) => {
        var handler = document.querySelector('.handler');
        // If mousedown event is fired from .handler, toggle flag to true
        if (e.target === handler) {
            setHandlerDragging(true);
        }
    }

    return(
        <div className="chat" onMouseMove={handlerMouseMove} onMouseUp={handlerMouseUp} onMouseDown={handlerMouseDown}> 
            <div className="chad-header">      
                <FilesBar/>          
                <ActionsBar onClickGetSelected={() => handleClickGetSelected(editorRef)} onClickGetText={handleClickGetAll}/>
            </div>    
            <div className="chat-body" style={{maxWidth: "1100px"}}>
                <div className="wrapper">
                    <div className="boxA">
                        <Editor
                            ref={(editor) => {
                                setEditor(editor); // keep the reference here.
                            }}
                            height="90vh"
                            width="100%"
                            language={"sql"}
                            className="code-container"
                            theme="vs-dark"
                            onMount={editorDidMount}
                            onChange={handleChangeCode}
                            value={text}
                            defaultValue="// Type here your SQML queries"
                        ></ Editor>     
                    </div>
                    <div className="handler"></div>
                    <div className="boxB">
                        <Editor
                            ref={(editor) => {
                                setEditor(editor); // keep the reference here.
                            }}
                            height="90vh"
                            width="100%"
                            language={"none"}
                            className="code-container"
                            theme="vs-dark"
                            onMount={traductionEditorDidMount}
                            value={traduction}
                            defaultValue=""
                        ></ Editor>      
                    </div>  
                </div>   
            </div>
        </div>
    )
}

export default EditorCustom;