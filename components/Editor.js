import React, { useRef, useEffect  } from "react";
import Editor from "@monaco-editor/react";
import ActionsBar from "./ActiosnsBar"
import FilesBar from "./FIlesBar"
import { textDefaultNewTab, makeData } from '../utils/config/default'

function EditorCustom(props) {
    const editorRef = useRef(null);
    const traductionRef = useRef(null);
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

    const handleResizeEditor = (e) => {
        console.log(e)
    }

    return(
        <div className="chat"> 
            <div className="chad-header">      
                <FilesBar 
                    handleExtraButton = {handleExtraButton}
                    handleTabChange = {handleTabChange}
                    handleDeleteTabButton = {handleDeleteTabButton}
                    states = {props.states}
                />          
                <ActionsBar onClickGetSelected={handleClickGetSelected} onClickGetText={handleClickGetAll} states = {props.states}/>
            </div>    
            <div className="chat-body">
                <div className="editorsContainer" style={{maxWidth: "80vw", maxHeight: "90vh"}}>
                    <div className="inputEditor" style={{width: "100%"}} onResize={handleResizeEditor}>
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
                    <div className="outputEditor" style={{width: "100%"}}>
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