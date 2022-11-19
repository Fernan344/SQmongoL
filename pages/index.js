import React, { useEffect, useRef } from "react";
import ResoursesBar from "../components/RecoursesBar";
import Loader from "../components/Loader"
import Editor from "../components/Editor"
import NavBar from "../components/NavBar";
import get from 'lodash/get';
import axios from "axios";
import { SnackbarProvider } from "notistack"

function IndexPage(props) {
  const {getResources, charge} = props.states
  
  

    

  useEffect(() => {
    getResources()
  }, [])

  return (
    <>
      <NavBar states={props.states}/>
      <div className="app">             
        <div className="app_body">
          <ResoursesBar states={props.states}/> 
          <Editor states={props.states}/>
        </div>       
      </div>
      {charge && <div className="component-charge">
        <Loader></Loader>
      </div>}
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