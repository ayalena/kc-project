import { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader/PageHeader";
import logo from "../../assets/mock-logo.jpg";
import './Sessions.css';
import NavBar from "../../components/NavBar/NavBar";

function Sessions() {
    const [isMounted, setIsMounted] = useState(false);
    const [fileLoading, toggleFileLoading] = useState(false);
    // sessions & sessionsId
    const [sessionInfo, setSessionInfo] = useState([]);
    const [currentSessionInfo, setCurrentSessionInfo] = useState([])
    // children & childrenId
    const [childInfo, setChildInfo] = useState([]);
    const [currentChildInfo, setCurrentChildInfo] = useState([])

    // getting the sessions
    useEffect(() => {
        setIsMounted(true);
        async function getSessionsData() {
            toggleFileLoading(true);
            try {
                const result = await axios("http://localhost:3001/sessions")
                setSessionInfo(result.data);
                setCurrentSessionInfo(result.data[0]);
            } catch (e) {
                console.error(e)
            }
            toggleFileLoading(false)
        }
        getSessionsData()
        return () => {
            setIsMounted(false)
        }
    }, [])
      // getting the children
      useEffect(() => {
        setIsMounted(true);
        async function getChildrenData() {
            toggleFileLoading(true);
            try {
                const result = await axios("http://localhost:3001/children")
                setChildInfo(result.data);
                setCurrentChildInfo(result.data[0]);
            } catch (e) {
                console.error(e)
            }
            toggleFileLoading(false)
        }
        getChildrenData()
        return () => {
            setIsMounted(false)
        }
    }, [])

    return (
        <>
            <NavBar></NavBar>
            <PageHeader icon={logo} />
            <div>
                <p>Sessions overview</p>
                <div>
                    {sessionInfo.map(sessionId => {
                        return <p
                            key={sessionId.id}
                            value={sessionId.id}
                        >
                            {sessionId.day}: {sessionId.start_time} - {sessionId.end_time}

                        </p>
                    })}
                </div>
            </div>


            <div className="sessions-container">
                <p>Sessions</p>
                <div>
                    {sessionInfo.map(sessionId => {
                        return <p
                            key={sessionId.id}
                            value={sessionId.id}
                        >
                            {sessionId.day}: {sessionId.start_time} - {sessionId.end_time}

                        </p>
                    })}
                </div>
            </div>
            <div className="children-container">
                <p>Children</p>
                <div>
                    {childInfo.map(childId => {
                        return <p
                            key={childId.id}
                            value={childId.id}
                        >
                            {childId.name} -
                            <img src={childId.avatar}></img> 
                    
                        </p>
                    })}
                </div>
            </div>

        </>
    );
}

export default Sessions;
