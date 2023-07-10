import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Button from '@mui/material/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useStateContext } from '../hooks/useSQML';

export default function ScrollableTabsButtonVisible(props) {    
    const { 
        handleTabChange, handleExtraButton, handleDeleteTabButton,
        activeIndex, myTabs, setMyTabs, tabs        
    } = useStateContext()
    
    useEffect(() => {
        const tabsComponents = tabs.map((tab, index) => <Tab label={tab.title} key={`tabComp${index}`}/>)
        setMyTabs(tabsComponents)
    }, [tabs])
    
    return (
        <div style={{maxWidth: "100%", paddingLeft: "2%"}}>
            <Box
                sx={{
                flexGrow: 1,
                bgcolor: 'background.paper',
                }}
            >   
                <Container style={{justifyContent: "center", alignContent: "center", alignItems: "center"}}>
                    <Row>
                        <Col style={{maxWidth: "80%", width: "80%"}}>
                            <Tabs
                                onChange={handleTabChange}
                                value={activeIndex}
                                maxWidth={"80%"}
                                width={"80%"}
                                variant="scrollable"
                                scrollButtons
                                aria-label="visible arrows tabs example"
                                sx={{
                                    [`& .${tabsClasses.scrollButtons}`]: {
                                    '&.Mui-disabled': { opacity: 0.3 },
                                    },
                                }}
                            >
                                {
                                    myTabs
                                }                       
                            </Tabs>   
                        </Col>
                        <Col style={{marginLeft: "78%", marginTop: "-4%"}}>                         
                            <Button onClick={()=>handleExtraButton()}><AddCircleRoundedIcon/></Button>
                        </Col>
                        <Col style={{marginLeft: "85%", marginTop: "-4%"}}>                         
                            <Button onClick={handleDeleteTabButton}><CloseIcon /></Button>
                        </Col>
                    </Row>
                </Container>        
            </Box>
        </div>
    );
  }