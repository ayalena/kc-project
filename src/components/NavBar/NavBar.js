import React from "react";
import './NavBar.css';
import { Link } from "react-router-dom";

function TopMenu() {
       return (
        <>
            <div className="nav-container">
                <ul>                    
                        <li>
                            <Link to="/">
                                Home
                            </Link>                            
                        </li>
                        <li>
                            <Link to="/sessions">
                                Sessions
                            </Link>
                        </li> 
                        <li>
                            <Link to="/news">
                                News
                            </Link>
                        </li>                                      
                        <li>
                            Login
                        </li>                     
                        <li>
                            Profile
                        </li>                                      
                        <li>
                            Log Out
                        </li>
                </ul>
            </div>
        </>
    );
}

export default TopMenu;