import React, { useEffect, useRef } from "react";
import ResoursesBar from "../components/RecoursesBar";
import Loader from "../components/Loader"
import Editor from "../components/Editor"
import NavBar from "../components/NavBar";
import LogInfo from "../components/LogInfo"
import { SnackbarProvider } from "notistack"

function IndexPage(props) {
  const {getResources, charge} = props.states    

  useEffect(() => {
    getResources(props)
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
      <div className="log-info">
            <LogInfo states = {props.states}/>
      </div>  
      <hr style={{"border":"15px", marginTop: "40rem"}}></hr>     
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