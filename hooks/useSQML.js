import { useState } from 'react'
import { textDefaultNewTab, makeData, translateModes } from '../utils/config/default'

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

    return {
        resources,
        text,
        tabs,
        activeIndex,
        myTabs,
        connections,
        modalShow,
        translateMode,
        traduction,
        setResources,
        setText,
        setTabs,
        setActiveIndex,
        setMyTabs,
        setConnections,
        setModalShow,
        setTranslateMode,
        setTraduction
    }
}