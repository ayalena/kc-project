import { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader/PageHeader";
import logo from "../../assets/mock-logo.jpg";
import './Sessions.css';
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

function Sessions() {
    const [isMounted, setIsMounted] = useState(false);
    const [fileLoading, toggleFileLoading] = useState(false);
    // sessions & sessionsId
    const [sessionInfo, setSessionInfo] = useState([]);
    const [currentSessionInfo, setCurrentSessionInfo] = useState([])
    // children & childrenId
    const [childInfo, setChildInfo] = useState([]);
    const [currentChildInfo, setCurrentChildInfo] = useState([])

    function handleClick() {
        console.log('clicked');
    }

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
            <div className="sessions-container">
                <h3>Sessions</h3>
                <div>
                    {sessionInfo.map(sessionId => {
                        return <div
                            key={sessionId.id}
                            value={sessionId.id}
                        >
                            <p>{sessionId.day}: {sessionId.start_time} - {sessionId.end_time}</p>
                            <p> {sessionId.product_name}</p>
                        </div>
                    })}
                </div>
                <Button
                    className="session-button"
                    type="button"
                    onClick={handleClick}
                    text="Previous"
                >
                </Button>
                <Button
                    className="session-button"
                    type="button"
                    onClick={handleClick}
                    text="Next"
                >
                </Button>
            </div>



            <div className="children-container">
                <h3>Children</h3>
                <div>
                    {childInfo.map(childId => {
                        return <div
                            key={childId.id}
                            value={childId.id}
                        >
                            <p>{childId.name}</p>                        
                            <img src={childId.avatar}></img>

                        </div>
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Sessions;
