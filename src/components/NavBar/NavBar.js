import {useState} from "react";
import './NavBar.css';
import { Link } from "react-router-dom";

function TopMenu() {
     // i would usually put authorisation in context 
     const [isLoggedIn, setIsLoggedIn] = useState(true);

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
                        {!isLoggedIn &&
                            <li>
                                Login
                            </li> 
                        }                                                   
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