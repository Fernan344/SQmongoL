import React, { createContext, useState, useContext, useEffect } from 'react';
import { textDefaultNewTab, makeData, translateModes } from '../utils/config/default'
import axios from 'axios'
import get from 'lodash/get'
import { StatusCodes } from "http-status-codes"
import set from 'lodash/set'
import isArray from 'lodash/isArray';
import path from 'path'

const StateContext = createContext();

export const useSQML = () => {
    const [ resources, setResources ] = useState([])
    const [ text, setText ] = useState(textDefaultNewTab);
    const [ tabs, setTabs ] = useState([]);
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ connections, setConnections ] = useState([])
    const [ modalShow, setModalShow] = useState(false)
    const [ translateMode, setTranslateMode ] = useState(translateModes.OnlyTranslate)
    const [ traduction, setTraduction ] = useState("");
    const [ modalNewConnectionShow, setModalNewConnectionShow ] = useState(false)
    const [ modalManageSessionsShow, setModalManageSessionsShow ] = useState(false)
    const [ modalDirectoryChooserShow, setModalDirectoryChooseShow ] = useState(false)
    const [ charge, setCharge ] = useState(false)
    const [ dbs, setDbs ] = useState([]);
    const [ myURI, setMyURI] = useState("none");
    const [ myDB, setMyDB] = useState("");
    const [ queryResults, setQueryResults ] = useState([])
    const [ log, setLog ] = useState('')   

    useEffect(() => {
      handleChangeCode(get(tabs, `${activeIndex}.content`, ''))
    }, [activeIndex])

    const showMessage = (props, messages, variant) => {
      const messagesToShow = isArray(messages) ? messages : [messages]
      messagesToShow.forEach(m => {
        props.enqueueSnackbar(m, {variant: variant})
      })
    }

    const showErrors = (props, messages) => {
      showMessage(props, messages, 'error');
    }

    const showSuccess = (props, messages) => {
      showMessage(props, messages, 'success');
    }

    const showWarning = (props, messages) => {
      showMessage(props, messages, 'warning');
    }

    const updateConnections = (cons) => {
      setConnections(cons)
      localStorage.setItem('connections', JSON.stringify(cons))
    }

    const saveFileInSystem = (
      props,
      dirs, 
      fileName, 
      ext, 
      setFileAlreadyExists = () => {},
      forceSave = false, 
      onSuccess = () => {}
    ) => {
      const activeTab = tabs[activeIndex]
      const content = (ext === 'js' ? traduction : activeTab.content) || "";
      if(fileName === "") {
          showErrors(props, "File name can not be empty")
          return
      }
      
      axios.post('/api/files', {
          fileName: `${fileName}`,
          ext: ext ? `${ext}` : undefined,
          dirs: dirs.map(d => d.dir),
          content,
          forceSave
      }).then(({data}) => {
          if(get(data, 'success') === true) {
              updatePathTab(get(data, 'fileName'), get(data, 'path'));
              showSuccess(props, "File saved successfully");   
              onSuccess()             
          } else {
              showErrors(props, "File can not be saved")
          }
          setFileAlreadyExists(false);
      }).catch(({response}) => {            
          showErrors(props, get(response, 'data.message', 'Error while trying save file'))
          if(get(response, 'data.status') === StatusCodes.CONFLICT) {
              setFileAlreadyExists(true);
              return
          }
      })
  }

    const saveFile = (props) => {
      if(get(tabs, `${activeIndex}.path`)) {
        const pathFile = get(tabs, `${activeIndex}.path`)
        const fileName = get(tabs, `${activeIndex}.title`)
        
        saveFileInSystem(props, [{ dir: pathFile }], fileName, undefined, () => {}, true, () => {});        
        return true;
      }
      showErrors(props, 'File not found')
      return false;
    }

    const updatePathTab = (name, path) => {
      const auxTabs = [...tabs]
      set(auxTabs, `${activeIndex}.path`, path);
      set(auxTabs, `${activeIndex}.title`, name);
      localStorage.setItem('tabs', JSON.stringify(auxTabs));
      setTabs(auxTabs)
    }
    
    const handleClickGetAll = () => {
      parseCode(text)
    }

    const initTabs = () => {      
      const existsTabs = localStorage.getItem('tabs');
      const sessions = localStorage.getItem('sessions');
      const currentSession = localStorage.getItem('currentSession');
      if(!currentSession) {        
        localStorage.setItem('currentSession', 'default');
      }
      if(!sessions) {
        localStorage.setItem('sessions', JSON.stringify({default: []}));
      }
      setActiveIndex(0);
      existsTabs ? setTabs(JSON.parse(existsTabs)) : handleExtraButton();
    }

    const selectNewSession = (newSession) => {
      const sessions = JSON.parse(localStorage.getItem('sessions'));
      const currentSession = localStorage.getItem('currentSession');

      set(sessions, currentSession, tabs);
      localStorage.setItem('sessions', JSON.stringify(sessions));
      const newCurrentTabs = get(sessions, newSession, [])
      localStorage.setItem('tabs', JSON.stringify(newCurrentTabs.length ? newCurrentTabs : makeData(1)));
      localStorage.setItem('currentSession', newSession);
      setModalManageSessionsShow(false);
      initTabs();
    }

    const handleClickGetSelected = (editorRef) => {
      parseCode(editorRef.current.getModel().getValueInRange(editorRef.current.getSelection()));
    }

    const handleChangeCode = (evt) => { 
      if(!tabs.length) return;    
      set(tabs, `${activeIndex}.content`, evt)
      localStorage.setItem('tabs', JSON.stringify(tabs));
      setText(evt)
    }

    const openFile = (title, data) => {
      setActiveIndex(tabs.length)
      setTabs([...tabs, {title, content: data}])
    }

    const handleExtraButton = (evt) => {
        setActiveIndex(tabs.length)
        setTabs([...tabs, ...makeData(1)])
    }  

    const handleDeleteTabButton = (evt) => {
      const tabsAux = [...tabs]      
      tabsAux.splice(activeIndex, 1)
      setActiveIndex(activeIndex-1)
      setTabs([...tabsAux])
    }

    const handleTabChange = (evt, newValue, useCase) => {
      switch(useCase){
        case 'noData':
          setActiveIndex(0);
          handleExtraButton();
          break;
        case 'elimination':
          setActiveIndex(newValue);
          setText(get(tabs, `${newValue}.content`, ''))
          break;
        case 'change':
          setText(get(tabs, `${activeIndex}.content`, ''))
          break;
        default:
          setActiveIndex(newValue);
          break;
      }          
    }

    const getResources = (props) => {
      axios.post("/api/resources", {db: myDB, uri: myURI})
        .then(({ data }) => {
          setResources(data)
      }).catch(err => {
        //props.enqueueSnackbar(get(err, 'message', `Connection can not be established`), {variant: "error"})
      })
    }
    
    const parseCode = (code) => {
      setCharge(true)
      axios.post("/api/parser", {code, onlyTranslate: !translateMode, uri: myURI, db: myDB })
      .then(({ data }) => {
        setTraduction(get(data, 'traduction'))
        setQueryResults(get(data, 'results'))
        setLog(get(data, 'console'))
        setCharge(false)
      }).catch((err) => {
        //props.enqueueSnackbar(get(err, 'message', `Connection can not be established`), {variant: "error"})
        setCharge(false)
      })
    }

    const modalConnectionsDidMount = () => {
      const cons = JSON.parse(localStorage.getItem('connections'))
      setConnections(cons && cons.length ? cons : [])
    }

    const testConnection = (props, uri) => {
      setCharge(true)
      axios.post('/api/connect', {uri})
      .then((response) => {
        if([StatusCodes.NO_CONTENT].includes(response.status)) {
          showSuccess(props, 'Connection stablished successfuly')
        } else {
          showErrors(props, `Connection can not be stablished`)
        }
        setCharge(false)
      })
      .catch((err) => {
        showErrors(props, `Connection can not be stablished`)
        setCharge(false)
      })
  }

    return {
        resources,
        text,
        tabs,
        activeIndex,
        connections,
        modalShow,
        modalNewConnectionShow,
        translateMode,
        traduction,
        dbs,
        charge,
        myURI,
        myDB,
        queryResults,
        log,
        modalManageSessionsShow, 
        modalDirectoryChooserShow, 
        setModalDirectoryChooseShow,
        setModalManageSessionsShow,
        parseCode,
        setResources,
        setText,
        setTabs,
        setActiveIndex,
        setConnections,
        setModalShow,
        setModalNewConnectionShow,
        setTranslateMode,
        setTraduction,
        setDbs,
        getResources,
        setCharge,
        setMyURI,
        setMyDB,
        makeData,
        handleTabChange,
        handleClickGetAll,
        handleClickGetSelected,
        handleChangeCode,
        handleExtraButton,
        handleDeleteTabButton,
        initTabs,
        openFile,
        modalConnectionsDidMount,
        selectNewSession,
        updateConnections,
        showErrors,
        showSuccess,
        showWarning,
        testConnection,
        updatePathTab,
        saveFileInSystem,
        saveFile
    }
}

export const StateProvider = ({ children }) => {
  return <StateContext.Provider value={useSQML()}>
    {children}
  </StateContext.Provider>
}

export const useStateContext = () => useContext(StateContext);