import React from "react";
import { Button } from 'react-bootstrap'
import FlashAutoIcon from '@mui/icons-material/FlashAuto';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SwitchButton from './SwitchButton'
import { useStateContext } from "../hooks/useSQML";

function ActiosnsBar(props) {
    const { translateMode, setTranslateMode } = useStateContext();
    return (
        <div className="action-bar">
            <div className="row">
                <div className="col-md-6">
                    <Button variant="outline-warning" onClick={() => props.onClickGetText()}><FlashOnIcon /></Button>
                    <Button variant="outline-success"  onClick = {() => props.onClickGetSelected()}><FlashAutoIcon /></Button>
                </div>
                <div className="col-md-6">
                    <SwitchButton onChange = {()=>{setTranslateMode(!translateMode)}}/>
                </div>            
            </div>            
        </div>
    )
}

export default ActiosnsBar