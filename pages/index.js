import React, { useEffect, useRef } from "react";
import ChatBar from "../Components/RecoursesBar";
import Editor from "../components/Editor"
import NavBar from "../components/NavBar";
import Form from 'react-bootstrap/Form';
import MonacoEditor from "@monaco-editor/react";
import get from 'lodash/get';
import axios from "axios";

function IndexPage(props) {
  const editorRef = useRef(null);
  const {translateMode, setResources, traduction, setTraduction} = props.states
  
  const getResources = () => {
    axios.get("/api/resources")
    .then(({ data }) => {
      setResources(data)
    })
  }

  const parseCode = (code) => {
    axios.post("/api/parser", {code, onlyTranslate: !translateMode })
    .then(({ data }) => {
      setTraduction(get(data, 'traduction'))
    })
  }

  

  useEffect(() => {
    getResources()
  }, [])

  return (
    <>
      <NavBar states={props.states}/>
      <div className="app">             
        <div className="app_body">
          <ChatBar getResources={getResources} states={props.states}/> 
          <Editor onHandleClickParse = {parseCode} states={props.states}/>
        </div>       
      </div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{paddingTop: "8%"}}>
                
      </Form.Group>
    </>
  )
}

export default IndexPage;