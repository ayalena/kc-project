import { useEffect, useState } from "react";
import axios from "axios";
// import PageHeader from "../../components/PageHeader/PageHeader";
// import logo from "../../assets/mock-logo.jpg";
import './Sessions.css';

function Sessions() {
    const [isMounted, setIsMounted] = useState(false);
    const [fileLoading, toggleFileLoading] = useState(false);
    // to display all sessions in list
    const [fileInfo, setFileInfo] = useState([]);
     // to select session (id)
     const [currentFileInfo, setCurrentFileInfo] = useState([])

    // getting the sessions
    useEffect(() => {
        setIsMounted(true);
        async function getSessionsData() {
            toggleFileLoading(true);
            try {
                const result = await axios("http://localhost:3001/sessions")
                setFileInfo(result.data);
                setCurrentFileInfo(result.data[0]);
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
    return (
        <>
            {/* <PageHeader icon={logo}/> */}
            <div className="sessions-container">
                <p>Sessions</p>
            </div>
            <div>
                {fileInfo.map(fileId => {
                                        return <p
                                            key={fileId.id}
                                            value={fileId.id}
                                        >
                                            {fileId.day} - {fileId.start_time}
                                        </p>
                                    })}
            </div>
        </>
    );
}

export default Sessions;
