import { useState } from 'react'
import { textDefaultNewTab, makeData, translateModes } from '../utils/config/default'
import axios from 'axios'

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

    const getResources = () => {
        axios.get("/api/resources")
        .then(({ data }) => {
          setResources(data)
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
        setCharge
    }
}