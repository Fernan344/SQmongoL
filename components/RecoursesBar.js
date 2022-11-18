import React from "react";
import Resourse from "./Resourse"
import BaseDatos from "./BaseDatos"
import Button from 'react-bootstrap/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import get from 'lodash/get'

function ChatBar(props) {
    const {resources, dbs, getResources} = props.states
    return(
        <div className="chatBar">
             <div className="chatBar_header">
                <h2>Data Bases</h2>
            </div>
            <div className="dbsBar">
                {
                    (dbs||[]).map(db => {
                        return <BaseDatos states = {props.states} key="" message={get(db, 'name')}/>
                    })
                }
            </div>
            <div className="chatBar_header">
                <h2>Collections</h2>
            </div>
            <div className="d-grid gap-2">
                <Button variant="outline-info" size="lg" onClick={ getResources }><RefreshIcon /></Button>
            </div>
            <div className="chatBar_chats">
                {
                    resources.map(data => {
                        return <Resourse key="" message={data["name"]}/>
                    })
                }                
            </div>
        </div>
    )
}

export default ChatBar;