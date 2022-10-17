import React, { useState, useEffect } from "react";
import ChatBar from "../Components/RecoursesBar";
import Editor from "../components/Editor"
import NavBar from "../components/NavBar";
import Form from 'react-bootstrap/Form';
import axios from "axios";

function IndexPage() {
  const [ resources, setResources ] = useState([])
  
  const getResources = () => {
    axios.get("/api/resources")
    .then(({ data }) => {
      setResources(data)
    })
  }

  const parseCode = (code) => {
    axios.post("/api/parser", {code})
    .then(({ data }) => {
      console.log(data)
    })
  }

  useEffect(() => {
    getResources()
  }, [])

  return (
    <>
      <NavBar />
      <div className="app">             
        <div className="app_body">
          <ChatBar accounts={resources} getResources={getResources}/> 
          <Editor onHandleClickParse = {parseCode}/>
        </div>       
      </div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{paddingTop: "8%"}}>
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={50} />
      </Form.Group>
    </>
  )
}

export default IndexPage;