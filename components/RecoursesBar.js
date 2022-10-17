import React from "react";
import Resourse from "./Resourse"
import Button from 'react-bootstrap/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import get from 'lodash/get'

function ChatBar(props) {
    return(
        <div className="chatBar">
            <div className="chatBar_header">
                <h2>Collections</h2>
            </div>
            <div className="d-grid gap-2">
                <Button variant="outline-info" size="lg" onClick={ get(props, 'getResources', ()=>{}) }><RefreshIcon /></Button>
            </div>
            <div className="chatBar_chats">
                {
                    get(props, 'accounts', []).map(data => {
                        return <Resourse key="" message={data["name"]}/>
                    })
                }                
            </div>
        </div>
    )
}

export default ChatBar;