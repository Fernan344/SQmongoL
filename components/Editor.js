import React, { useState, useRef, useEffect  } from "react";
import Editor from "@monaco-editor/react";
import ActionsBar from "./ActiosnsBar"
import FilesBar from "./FIlesBar"

const textDefaultNewTab = `// Type here your SQML queries`

const makeData = (number) => {
    const data = [];
    for (let i = 0; i < number; i++) {
      data.push({
        title: `New File *`,
        content: textDefaultNewTab
      });
    }
    return data;
}

function Chat(props) {
    const editorRef = useRef(null);
    const [ text, setText ] = useState(textDefaultNewTab);
    const [ tabs, setTabs ] = useState(makeData(1));
    const [ activeIndex, setActiveIndex ] = useState(0);

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

    return(
        <div className="chat"> 
            <div className="chad-header">      
                <FilesBar 
                    tabs = {tabs}
                    handleExtraButton = {handleExtraButton}
                    handleTabChange = {handleTabChange}
                    handleDeleteTabButton = {handleDeleteTabButton}
                    activeIndex = {activeIndex}
                />          
                <ActionsBar onClickGetSelected={handleClickGetSelected} onClickGetText={handleClickGetAll}/>
            </div>    
            <div className="chat-body">
                <Editor
                    ref={(editor) => {
                        setEditor(editor); // keep the reference here.
                    }}
                    height="90vh"
                    width="80vw"
                    language={"sql"}
                    className="code-container"
                    theme="vs-dark"
                    onMount={editorDidMount}
                    onChange={handleChangeCode}
                    value={text}
                    defaultValue="// Type here your SQML queries"
                ></ Editor>              
            </div>
        </div>
    )
}

export default Chat;