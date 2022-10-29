import React, { useEffect, useRef } from "react";
import ChatBar from "../components/RecoursesBar";
import Editor from "../components/Editor"
import NavBar from "../components/NavBar";
import Form from 'react-bootstrap/Form';
import get from 'lodash/get';
import axios from "axios";

function IndexPage(props) {
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
    </>
  )
}

export default IndexPage;