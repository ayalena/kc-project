import { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader/PageHeader";
import logo from "../../assets/mock-logo.jpg";
import './News.css';
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function News() {
    const [isMounted, setIsMounted] = useState(false);
    const [fileLoading, toggleFileLoading] = useState(false);
    // news
    const [newsInfo, setNewsInfo] = useState([]);
    const [currentNewsnInfo, setCurrentNewsInfo] = useState([])

    const navigate = useNavigate ();

    function handleClick() {
        navigate("/form");
    }
 
    // getting the news
    useEffect(() => {
        setIsMounted(true);
        async function getNewsData() {
            toggleFileLoading(true);
            try {
                const result = await axios("http://localhost:3001/news")
                setNewsInfo(result.data);
                setCurrentNewsInfo(result.data[0]);
            } catch (e) {
                console.error(e)
            }
            toggleFileLoading(false)
        }
        getNewsData()
        return () => {
            setIsMounted(false)
        }
    }, [])

    return (
        <>
            <NavBar></NavBar>
            <PageHeader icon={logo} />
          
            <div className="news-container">
                <h1>News!</h1>
                <div>
                    {newsInfo.map(newsId => {
                        return <p
                            key={newsId.id}
                            value={newsId.id}
                        >
                           <h2> {newsId.title}</h2>
                           <h3> {newsId.author} </h3>
                           <p> {newsId.content} </p>

                        </p>
                    })}
                </div>
            </div>

            <Button
                    className="news-button"
                    type="button"
                    onClick={handleClick}
                    text="ADD NEW POST!"
                >
            </Button>   

            <Footer />     
        </>
    );
}

export default News;
