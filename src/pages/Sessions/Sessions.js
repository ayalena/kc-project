/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader/PageHeader";
import logo from "../../assets/mock-logo.jpg";
import './Sessions.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Session from "../../components/Session/Session";
import Button from '@mui/material/Button';
import { Select, MenuItem, OutlinedInput, InputLabel } from "@mui/material";

const style = {
    padding: 3,
    margin: 10,
    color: 'white',
    backgroundColor: ' #8e0000',
};

const navStyle = {
    padding: 10,
    margin: 5,
    width: 200,
    marginTop: 30,
    backgroundColor: '#fa5f5f'
}

const groupStyle = {
    padding: 3,
    margin: 10,
    backgroundColor: 'white',
    width: 150,
    height: 30,
    color: "black"
};


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
        const desiredGroup = selectedValue;
        const filteredData = sessionInfo.filter(item => item.group.name === desiredGroup);
        const enrichedData = filteredData.map(item => {
            const child = childInfo.find(childItem => childItem.id === item.child_id);
            return { ...item, avatar: child?.avatar, child_name: child?.name };
        });
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
        if (isMounted) {
            handleDateSorting();
        } else {
            setIsMounted(true)
        }
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
                        <InputLabel>Sort Date</InputLabel>
                        <input
                            type="date"
                            placeholder="2023-06-02"
                            onChange={handleDateChange}
                            value={searchInput}
                            min="2023-05-31"
                            max="2023-06-03"
                        />
                        <Button
                            variant="contained"
                            onClick={handleDateSorting}
                            label="Primary"
                            primary="true"
                            style={style}
                        >
                            Sort
                        </Button>
                    </div>
                    <div className="sortgroup-container">
                        <InputLabel>Sort Group</InputLabel>
                        <Select
                            value={groupInput.name}
                            label="Group"
                            onChange={(e) => { setSelectedValue(e.target.value) }}
                            style={groupStyle}
                            defaultValue="Group 1"

                        >
                            <MenuItem value="Group 1">Group 1</MenuItem>
                            <MenuItem value="Group 2">Group 2</MenuItem>
                            <MenuItem value="Group 3">Group 3</MenuItem>
                            <MenuItem value="Group 4">Group 4</MenuItem>

                        </Select>
                        <Button
                            variant="contained"
                            onClick={handleGroupSorting}
                            label="Primary"
                            primary="true"
                            style={style}
                        >
                            Sort
                        </Button>
                    </div>

                </div>


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
                            variant="contained"
                            onClick={handlePreviousDate}
                            label="Primary"
                            primary="true"
                            style={navStyle}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleNextDate}
                            label="Primary"
                            primary="true"
                            style={navStyle}
                        >
                            Next
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
