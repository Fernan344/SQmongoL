import { useState } from 'react'
import { textDefaultNewTab, makeData, translateModes } from '../utils/config/default'
import axios from 'axios'
import get from 'lodash/get'
import set from 'lodash/set'

export const useSQML = () => {
    const [ resources, setResources ] = useState([])
    const [ text, setText ] = useState(textDefaultNewTab);
    const [ tabs, setTabs ] = useState(makeData(1));
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ myTabs, setMyTabs ] = useState([])
    const [ connections, setConnections ] = useState([])
    const [ modalShow, setModalShow] = useState(false)
    const [ translateMode, setTranslateMode ] = useState(translateModes.OnlyTranslate)
    const [ traduction, setTraduction ] = useState("");
    const [ modalNewConnectionShow, setModalNewConnectionShow ] = useState(false)
    const [ charge, setCharge ] = useState(false)
    const [ dbs, setDbs ] = useState([])
    const [ myURI, setMyURI] = useState("");
    const [ myDB, setMyDB] = useState("");
    const [ queryResults, setQueryResults ] = useState([])
    const [ log, setLog ] = useState('')   
    
    const handleClickGetAll = () => {
      parseCode(text)
    }

    const handleClickGetSelected = (editorRef) => {
      parseCode(editorRef.current.getModel().getValueInRange(editorRef.current.getSelection()));
    }

    const handleChangeCode = (evt) => {
      setText(evt)
    }

    const handleExtraButton = (evt) => {
        setActiveIndex(tabs.length)
        setTabs([...tabs, {
            title: `New File *`,
            content: textDefaultNewTab
        }])
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
          set(tabs, `${activeIndex}.content`, text)
          setActiveIndex(newValue);
          setText(get(tabs, `${newValue}.content`, ''))
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

    return {
        resources,
        text,
        tabs,
        activeIndex,
        myTabs,
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
        parseCode,
        setResources,
        setText,
        setTabs,
        setActiveIndex,
        setMyTabs,
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
        handleDeleteTabButton
    }
}