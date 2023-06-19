import { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader/PageHeader";
import logo from "../../assets/mock-logo.jpg";
import './News.css';
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NewsItem from "../../components/NewsItem/NewsItem";
import Button from '@mui/material/Button';

const style = {
    padding: 10,
    margin: 5,
    width: 200,
    marginTop: 30,
    backgroundColor: '#fa5f5f'
  }

function News() {
    const [isMounted, setIsMounted] = useState(false);
    const [fileLoading, toggleFileLoading] = useState(false);
    const [newsInfo, setNewsInfo] = useState([]);

    const navigate = useNavigate ();

    function handleClick() {
        navigate("/form");
    }
 
    useEffect(() => {
        setIsMounted(true);
        async function getNewsData() {
            toggleFileLoading(true);
            try {
                const result = await axios("http://localhost:3001/news")
                setNewsInfo(result.data);
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
                <div className="newsItems-container">
                    {newsInfo.map(newsId => (                       
                           <NewsItem 
                                key={newsId.id} 
                                title={newsId.title} 
                                author={newsId.author} 
                                content={newsId.content}>
                            </NewsItem>                        
                    ))}
                </div>
                <Button
                    
                    variant="contained"
                            onClick={handleClick}
                            label="Primary"
                            primary="true"
                            style={style}
                >
                    Add new post!
            </Button>  
            </div>
             
            <Footer />     
        </>
    );
}

export default News;
