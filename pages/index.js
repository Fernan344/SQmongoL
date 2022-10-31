import React, { useEffect, useRef } from "react";
import ResoursesBar from "../components/RecoursesBar";
import Editor from "../components/Editor"
import NavBar from "../components/NavBar";
import get from 'lodash/get';
import axios from "axios";
import { SnackbarProvider } from "notistack"

function IndexPage(props) {
  const {translateMode, getResources, setTraduction} = props.states
  
  

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
          <ResoursesBar states={props.states}/> 
          <Editor onHandleClickParse = {parseCode} states={props.states}/>
        </div>       
      </div>
    </>
  )
}

export default function IntegrationNotistack(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <IndexPage {...props}/>
    </SnackbarProvider>
  );
}