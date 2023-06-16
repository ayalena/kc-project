/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader/PageHeader";
import logo from "../../assets/mock-logo.jpg";
import './Sessions.css';
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import sortOnDate from "../../Helper/SortSessions";
import Session from "../../components/Session/Session";

function Sessions() {
    const [isMounted, setIsMounted] = useState(false);
    const [fileLoading, toggleFileLoading] = useState(false);
    // sessions & sessionsId
    const [sessionInfo, setSessionInfo] = useState([]);
    const [currentSessionInfo, setCurrentSessionInfo] = useState([])
    // children & childrenId
    const [childInfo, setChildInfo] = useState([]);
    const [currentChildInfo, setCurrentChildInfo] = useState([])

    const [presenceInfo, setPresenceInfo] = useState(sessionInfo.presence);

    const [filteredDays, setFilteredDays] = useState();
    const [filteredGroups, setFilteredGroups] = useState();

    function handleClick() {
        console.log('clicked');
    }
    function handleDateSorting() {
        console.log(sessionInfo);
        const desiredDate = "2023-05-31";
        const filteredData = sessionInfo.filter(item => item.day === desiredDate);
        console.log(filteredData);
        setFilteredDays(filteredData);
    }

    // const getClassNamesFor = (name) => {
    //     if (!sortConfig) return;
    //     return sortConfig.key === name ? sortConfig.direction : undefined;
    // }

    function handlePresence() {
        const presenceInfo = sessionInfo.filter((session, id) => (
            console.log(session.presence, id)
        ));
        setPresenceInfo(presenceInfo);
        if (presenceInfo === 'unkown') {
            setPresenceInfo('present');
        } else {
            console.log('nothing to see here')
        }
        // else if(sessionInfo.presence === 'present' || presenceInfo === 'present' ) {
        //     setPresenceInfo('picked up');
        // } else if(sessionInfo.presence === 'picked up' || presenceInfo === 'picked up') {
        //     setPresenceInfo('unknown');
        // }
    }

    function handleGroupSort() {
        console.log(sessionInfo);
        const desiredGroup = "Group 1";
        const filteredData = sessionInfo.filter(item => item.group.name === desiredGroup);
        console.log(filteredData);
        setFilteredGroups(filteredData);
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
                <Button
                    className="session-button"
                    type="button"
                    onClick={handleDateSorting}
                    text="Sort"
                >
                </Button>

                {filteredDays &&                
                    filteredDays.map((filteredDay) => (
                        <Session date={filteredDay.day}></Session>
                    ))                
                }



                <div className="table-container">
                    <div className="table-content">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Date</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Duration</th>
                                    <th>Name</th>
                                    <th>Presence</th>
                                    <th>Avatar</th>
                                    <th>
                                        Group
                                        <Button
                                            className="group-button"
                                            type="button"
                                            onClick={handleGroupSort}
                                            text="Sort"
                                        >
                                        </Button>
                                    </th>
                                </tr>
                                {sessionInfo.map((session) => (
                                    <tr
                                        key={session.id}
                                    >
                                        <td>
                                            {session.day}
                                        </td>
                                        <td>
                                            {session.start_time}
                                        </td>
                                        <td>
                                            {session.end_time}
                                        </td>
                                        <td>
                                            {session.product_name}
                                        </td>
                                        <td>
                                            {session.child_id}
                                        </td>
                                        <td>
                                            {!presenceInfo ?
                                                <>{session.presence}
                                                    {/* <Button
                                                        className="presence-button"
                                                        type="button"
                                                        onClick={handlePresence}
                                                        text="Change"
                                                    >
                                                    </Button> */}
                                                </>

                                                :
                                                <>{presenceInfo}
                                                    {/* <Button
                                                        className="presence-button"
                                                        type="button"
                                                        onClick={handlePresence}
                                                        text="Change"
                                                    >
                                                    </Button> */}
                                                </>
                                            }
                                            {/* {presenceInfo} */}
                                            {/* {session.presence} */}
                                            <Button
                                                className="presence-button"
                                                type="button"
                                                onClick={handlePresence}
                                                text="Change"
                                            >
                                            </Button>

                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            {session.group.name}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
