import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import get from "lodash/get"

function Account(props) {
    function change(){
        props.change(props.room, props.id)
    }
//{get(props, 'message', '')}
    return(
        <div className="chatPersonal">
            <Dropdown style={{width: '100%'}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width: '100%'}}>
                        {get(props, 'message', '').length < 16 ? get(props, 'message', '') : `${get(props, 'message', '').substr(0,16)}...`}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Actions</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Account;