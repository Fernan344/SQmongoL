import React from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import get from "lodash/get"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { withSnackbar } from "notistack";

function BaseDatos(props) {

    const {getResources, setMyDB, myURI} = props.states;

    const handleUpdateDataBase = () => {
        axios.put('/api/connect', {dbName: get(props, 'message', ''), uri: myURI})
        .then((response) => {
            setMyDB(get(props, 'message', ''))
            getResources(props);
            props.enqueueSnackbar(`DB was changed to ${get(props, 'message', '')}`, {variant: "warning"})
        })
        .catch((err) => {
            props.enqueueSnackbar(get(err, 'message', `Connection can not be established`), {variant: "error"})
        })
    }

    return(
        <div className="BaseDatosDiv">
            <div class="DBcard">                
                <div class="dbTitleCard">
                    <div class="textTitle">
                        {get(props, 'message', '').length < 10 ? get(props, 'message', '') : `${get(props, 'message', '').substr(0,10)}...`}
                    </div>
                </div>
                <div class="dbActionButton">
                    <Button style={{height: "1.5rem", justifyContent: "center", alignContent: "center", alignItems: "center"}}
                        onClick = {handleUpdateDataBase}
                        >
                        <PlayArrowIcon style={{position: "relative", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}></PlayArrowIcon>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default withSnackbar(BaseDatos);