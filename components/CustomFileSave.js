import React, { useState, useEffect } from 'react';
import CustomTable from './CustomTable';
import { useStateContext } from "../hooks/useSQML";
import { withSnackbar } from 'notistack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Modal from './Modal';
import axios from 'axios';

function CustomFileChooser(props) {
    const {dirs, setDirs} = props;

    const {
        modalDirectoryChooserShow
    } = useStateContext();
    
    useEffect(() => {
        axios.post('/api/directory', {actualDir: null}).then(({data}) => {
            setDirs([{name: 'Home', dirs: data.items, dir: data.dir, fullPath: data.dir}])
        })
    }, [modalDirectoryChooserShow]);

    const navigateTo = (dir) => {
        axios.post('/api/directory', {actualDir: [...dirs.map(d => d.dir), dir]})
        .then(({data}) => {
            setDirs([...dirs, {name: dir, dirs: data.items, dir, fullPath: data.dir}])
        })
    }

    const returnToDirectory = (i) => {
        const dirsAux = [...dirs]
        dirsAux.splice(i+1, dirsAux.length - i+1)
        setDirs(dirsAux)
    }

    return (
        <>
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        {
                            dirs.map((dir, i) => {
                                const dirName = i === 0 ? 'Home' : dir.name;
                            
                                return i===dirs.length-1?
                                <li class="breadcrumb-item active" aria-current="page">{dirName}</li>
                                :
                                <li class="breadcrumb-item">
                                    <button 
                                        style={{backgroundColor: 'transparent', border: '0px transparent', color: '#3A98D5'}}
                                        onClick={() => {returnToDirectory(i)}}
                                    >
                                        {dirName}
                                    </button>
                                </li>
                            })
                        }                        
                    </ol>
                </nav>            
                <h6>{(dirs.length && dirs[dirs.length-1].fullPath)}</h6>
                <CustomTable 
                    rows={((dirs.length && dirs[dirs.length-1].dirs)||[]).map(d => [
                        d.name, 
                        <Button onClick={() => {navigateTo(d.name)}}><ArrowForwardIcon></ArrowForwardIcon></Button>
                    ])}
                    style={{
                        body: {
                            height: "40vh"
                        }
                    }}
                ></CustomTable>
            </div>
        </>
    )
}

const CustomSaveFileFooter = withSnackbar((props) => {
    const { ext, dirs, onSuccess } = props

    const {
        saveFileInSystem
    } = useStateContext();

    const [fileAlreadyExists, setFileAlreadyExists] = useState(false);
    const [fileName, setFileName] = useState("");
    
    const handleSaveFile = (forceSave = false) => {
        saveFileInSystem(props, dirs, fileName, ext, setFileAlreadyExists, forceSave, onSuccess)
    }

    const handleChangeFileName = (e) => {
        const newFileName = e.target.value
        newFileName !== "" && setFileName(newFileName || "")
    }

    return (
        <>
            {
                !fileAlreadyExists 
                ?   <Form>
                        <Form.Group className="mb-3" controlId="newFileName" onChange={handleChangeFileName}>
                            <div class="row" style={{top: '0.5rem', position: 'relative'}}>
                                <div class="col">  
                                    <Form.Control type="text" placeholder="File Name" defaultValue={fileName}/>
                                </div> 
                                <div class="col">  
                                    <h3 style={{width: "5vw"}}>.{ext}</h3>                        
                                </div> 
                                <div class="col">  
                                    <Button onClick={() => handleSaveFile(false)}>Guardar</Button>
                                </div> 
                            </div>
                        </Form.Group>
                    </Form>         
                : <Form>
                    <Form.Group className="mb-3" controlId="newFileName">
                        <div class="row" style={{top: '0.5rem', position: 'relative'}}>
                            <div class="col">  
                                <Button onClick={() => handleSaveFile(true)} variant='warning'>OverWrite</Button>
                            </div> 
                            <div class="col">  
                                <Button onClick={() => {setFileAlreadyExists(false)}} variant='danger'>Cancel</Button>
                            </div> 
                        </div>
                    </Form.Group>
                </Form>
            } 
        </>
    )
})

function CustomSaveDialog({ ext }) {
    
    const [dirs, setDirs] = useState([])

    const {
        modalDirectoryChooserShow,
        setModalDirectoryChooseShow
    } = useStateContext();

    return (
        <Modal 
            show={modalDirectoryChooserShow} 
            onHide = {()=>{setModalDirectoryChooseShow(false);}}    
            modalFooter = {<><CustomSaveFileFooter ext={ext} dirs={dirs} onSuccess={() => setModalDirectoryChooseShow(false)}></CustomSaveFileFooter></>}
            componentDidMount = {() => {}}
            modalTitle = {"Find Directory"}
            modalBody = {() => <CustomFileChooser dirs={dirs} setDirs={setDirs}></CustomFileChooser>}
        />    
    );
}

export default withSnackbar(CustomSaveDialog);