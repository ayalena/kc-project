/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
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
    const [searchInput, setSearchInput] = useState("2023-06-02");
    const [groupInput, setGroupInput] = useState("Group 1");

    const [sessionInfo, setSessionInfo] = useState([]);
    const [childInfo, setChildInfo] = useState([]);

    const [filteredDays, setFilteredDays] = useState();

    const [selectedValue, setSelectedValue] = useState('Group 1');

    // button handlings
    function handleDateSorting() {
        let desiredDate = searchInput;
        const filteredData = sessionInfo.filter(item => item.day === desiredDate);
        // merge child data with filtered data
        const enrichedData = filteredData.map(item => {
            const child = childInfo.find(childItem => childItem.id === item.child_id);
            return { ...item, avatar: child?.avatar, child_name: child?.name };
        });
        setFilteredDays(enrichedData);
    }

    const handleDateChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    function handleGroupSorting() {
        console.log(sessionInfo);
        const desiredGroup = selectedValue;
        const filteredData = sessionInfo.filter(item => item.group.name === desiredGroup);
        const enrichedData = filteredData.map(item => {
            const child = childInfo.find(childItem => childItem.id === item.child_id);
            return { ...item, avatar: child?.avatar, child_name: child?.name };
        });
        console.log(enrichedData);
        setFilteredDays(enrichedData);
    }

    const handleGroupChange = (e) => {
        e.preventDefault();
        setGroupInput(e.target.value);
    };

    const handlePreviousDate = () => {
        const currentDate = new Date(searchInput);
        const previousDate = new Date(currentDate);
        previousDate.setDate(currentDate.getDate() - 1);
        setSearchInput(previousDate.toISOString().split('T')[0]);
    };

    const handleNextDate = () => {
        const currentDate = new Date(searchInput);
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);
        setSearchInput(nextDate.toISOString().split('T')[0]);
    };

    useEffect(() => {
        handleDateSorting();
    }, [searchInput]);

    // getting the sessions
    useEffect(() => {
        setIsMounted(true);
        async function getSessionsData() {
            try {
                const result = await axios("http://localhost:3001/sessions")
                setSessionInfo(result.data);

            } catch (e) {
                console.error(e)
            }
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
            try {
                const result = await axios("http://localhost:3001/children")
                setChildInfo(result.data);
            } catch (e) {
                console.error(e)
            }
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
                <div className="sorting-container">
                    <div className="sortdate-container">
                        <input
                            type="date"
                            placeholder="2023-06-02"
                            onChange={handleDateChange}
                            value={searchInput}
                            min="2023-05-31"
                            max="2023-06-03"
                        />
                        <Button
                            className="sort-button"
                            type="button"
                            onClick={handleDateSorting}
                            text="Sort"
                        >
                        </Button>
                    </div>
                    <div className="sortgroup-container">
                        <select onChange={(e) => { setSelectedValue(e.target.value) }}>
                            <option value="Group 1" onChange={handleGroupChange}> Group 1</option>
                            <option value="Group 2" onChange={handleGroupChange}> Group 2</option>
                            <option value="Group 3" onChange={handleGroupChange}> Group 3</option>
                            <option value="Group 4" onChange={handleGroupChange}> Group 4</option>
                        </select>
                        <Button
                            className="sort-button"
                            type="button"
                            onClick={handleGroupSorting}
                            text="Sort"
                        >
                        </Button>
                    </div>
                </div>


                {!searchInput &&
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
                            onClick={handlePreviousDate}
                            text="Previous"
                        >
                        </Button>
                        <Button
                            className="session-button"
                            type="button"
                            onClick={handleNextDate}
                            text="Next"
                        >
                        </Button>

                    </div>
                }

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

            </div>
            <Footer />
        </>
    );
}

export default Sessions;
