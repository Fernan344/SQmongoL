import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap'
import FlashAutoIcon from '@mui/icons-material/FlashAuto';
import FlashOnIcon from '@mui/icons-material/FlashOn';


function NavBar(props) {

    return (
        <div className="action-bar">
            <Button variant="outline-warning" onClick={() => props.onClickGetText()}><FlashOnIcon /></Button>
            <Button variant="outline-success"  onClick = {() => props.onClickGetSelected()}><FlashAutoIcon /></Button>
        </div>
    )
}

export default NavBar