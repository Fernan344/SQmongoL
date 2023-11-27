import React, { useEffect, useRef } from "react";
import ResoursesBar from "../components/RecoursesBar";
import Loader from "../components/Loader"
import Editor from "../components/Editor"
import NavBar from "../components/NavBar";
import LogInfo from "../components/LogInfo"
import { SnackbarProvider } from "notistack"
import { useStateContext } from "../hooks/useSQML";

function IndexPage(props) {
  const {getResources, charge, initTabs, myURI} = useStateContext()  

  useEffect(() => {
    getResources(props)
    initTabs();
  }, [])

  return (
    <>
      <NavBar/>        
      <div className="app_body">
        { myURI !== 'none' 
          ? <div className="app_body_col_res"><ResoursesBar/></div> 
          : <></> 
        }
        <div className={myURI === 'none' ? "app_body_col_ed" : "app_body_col_ed_shared" }><Editor/></div>                   
      </div>     
      <div className="log-info">
            <LogInfo/>
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