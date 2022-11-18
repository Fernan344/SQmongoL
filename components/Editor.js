import React, { useRef, useEffect, useState  } from "react";
import Editor from "@monaco-editor/react";
import ActionsBar from "./ActiosnsBar"
import FilesBar from "./FIlesBar"
import { textDefaultNewTab, makeData } from '../utils/config/default'

function EditorCustom(props) {
    const editorRef = useRef(null);
    const traductionRef = useRef(null);
    const [ isHandlerDragging, setHandlerDragging ] = useState(false);
    const {
        text, tabs, activeIndex, setActiveIndex, setText, setTabs, setEditor, traduction, setTraduction
    } = props.states

    useEffect(() => {
        if(activeIndex === -1){
            handleTabChange(undefined, 0, true)
        } else {
            handleTabChange(undefined, tabs.length - 1)
        }
    }, [tabs])

    useEffect(() => {
        document.addEventListener('mousedown', function(e) {
            
        });

        document.addEventListener('mousemove', function(e) {
            
        });

        document.addEventListener('mouseup', function(e) {
            // Turn off dragging flag when user mouse is up
            
        });
    }, [])

    const handleTabChange = (evt, newValue, onDelete = false) => {  
        if(!onDelete) tabs[activeIndex].content = text
        setActiveIndex(newValue);
        setText(tabs[newValue].content)       
    }

    const handleClickGetAll = (e) => {
        props.onHandleClickParse(text)
    }

    const handleClickGetSelected = (e) => {
        console.log(editorRef.current.getModel().getValueInRange(editorRef.current.getSelection()));
    }

    const editorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const traductionEditorDidMount = (editor, monaco) => {
        traductionRef.current = editor;
    }

    const handleChangeCode = (evt) => {
        setText(evt)
    }

    const handleExtraButton = (evt) => {
        setTabs([...tabs, {
            title: `New File *`,
            content: textDefaultNewTab
        }])
    }

    const handleDeleteTabButton = (evt) => {
        const tabsAux = [...tabs]
        tabsAux.splice(activeIndex, 1)
        setTabs(!tabsAux.length ? makeData(1) : tabsAux)
        if(!tabsAux.length) setText(textDefaultNewTab)
        setActiveIndex(activeIndex  - 1)
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
                <FilesBar 
                    handleExtraButton = {handleExtraButton}
                    handleTabChange = {handleTabChange}
                    handleDeleteTabButton = {handleDeleteTabButton}
                    states = {props.states}
                />          
                <ActionsBar onClickGetSelected={handleClickGetSelected} onClickGetText={handleClickGetAll} states = {props.states}/>
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
                            language={"javascript"}
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