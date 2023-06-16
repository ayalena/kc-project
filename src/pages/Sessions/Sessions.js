/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader/PageHeader";
import logo from "../../assets/mock-logo.jpg";
import './Sessions.css';
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import Session from "../../components/Session/Session";

function Sessions() {
    const [isMounted, setIsMounted] = useState(false);
    const [fileLoading, toggleFileLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const [sessionInfo, setSessionInfo] = useState([]);
    const [childInfo, setChildInfo] = useState([]);

    const [presenceInfo, setPresenceInfo] = useState(sessionInfo.presence);

    const [filteredDays, setFilteredDays] = useState();
    const [filteredGroups, setFilteredGroups] = useState();

    // button handlings
    function handleClick() {
        console.log('clicked');
    }

    function handleDateSorting() {
        const desiredDate = searchInput;
        const filteredData = sessionInfo.filter(item => item.day === desiredDate);
        // merge corresponding childs data with filtered data
        const enrichedData = filteredData.map(item => {
            const child = childInfo.find(childItem => childItem.id === item.child_id);
            return { ...item, avatar: child?.avatar, child_name: child?.name };
        });
        setFilteredDays(enrichedData);
        console.log(enrichedData);
    }

    // function handlePresence() {
    //     console.log(sessionInfo);
    // }

    // function handleGroupSort() {
    //     console.log(sessionInfo);
    //     const desiredGroup = "Group 1";
    //     const filteredData = sessionInfo.filter(item => item.group.name === desiredGroup);
    //     console.log(filteredData);
    //     setFilteredGroups(filteredData);

    // }

    const handleDateChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    // getting the sessions
    useEffect(() => {
        setIsMounted(true);
        async function getSessionsData() {
            toggleFileLoading(true);
            try {
                const result = await axios("http://localhost:3001/sessions")
                setSessionInfo(result.data);

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
                <input
                    type="date"
                    placeholder="2023-06-02"
                    onChange={handleDateChange}
                    value={searchInput}
                    min="2023-05-31"
                    max="2023-06-03"
                />
                <Button
                    className="session-button"
                    type="button"
                    onClick={handleDateSorting}
                    text="Sort"
                >
                </Button>

                {filteredDays &&
                    filteredDays.map((filteredDay) => (
                        <Session
                            key={filteredDay.id}
                            date={filteredDay.day}
                            start={filteredDay.start_time}
                            end={filteredDay.end_time}
                            duration={filteredDay.product_name}
                            name={filteredDay.child_name}
                            group={filteredDay.group.name}
                            presence={filteredDay.presence}
                            avatar={filteredDay.avatar}
                        >
                        </Session>
                    ))

                }

                {!filteredDays &&
                    <div>
                        <div className="table-container">
                            <div className="table-content">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Date</th>
                                            <th>Start</th>
                                            <th>End</th>
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }

                {filteredDays &&
                    <div>
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

                }

            </div>
            <Footer />
        </>
    );
}

export default Sessions;
