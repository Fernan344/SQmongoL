import React from "react";
import { Button } from 'react-bootstrap'
import FlashAutoIcon from '@mui/icons-material/FlashAuto';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SwitchButton from './SwitchButton'

function ActiosnsBar(props) {
    const { translateMode, setTranslateMode } = props.states;
    return (
        <div className="action-bar">
            <div class="row">
                <div className="col-md-6">
                    <Button variant="outline-warning" onClick={() => props.onClickGetText()}><FlashOnIcon /></Button>
                    <Button variant="outline-success"  onClick = {() => props.onClickGetSelected()}><FlashAutoIcon /></Button>
                </div>
                <div className="col-md-6">
                    <SwitchButton onChange = {()=>{setTranslateMode(!translateMode)}} states = {props.states}/>
                </div>            
            </div>
            
        </div>
    )
}

export default ActiosnsBar