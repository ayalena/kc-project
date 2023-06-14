import './Home.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import logo from '../../assets/mock-logo.jpg';
import { Link, useNavigate  } from 'react-router-dom';
import Button from '../../components/Button/Button';

function Home() {
    const navigate = useNavigate ();

    function handleClick() {
        navigate("/news");
    }
    return(
        <>
        <PageHeader icon={logo} title="Welcome to KidsKonnect!"/>
            <div className="page-container">
                <section className="section">
                    <p>Welcome to KidsKonnect! On this page you can access the sessions.</p>
                    <p>
                        Ab aliquid amet animi aperiam assumenda, atque autem dolorum ducimus et excepturi ipsa magnam
                        nemo
                        nulla
                        possimus provident,
                        quos ratione repellendus sed sequi tempore! Accusantium amet commodi deleniti exercitationem
                        impedit
                        obcaecati quis repudiandae!
                    </p>
                    <p>
                        Accusamus aliquam aliquid blanditiis consequatur est et minima mollitia neque
                        non, odit perspiciatis placeat
                        provident quos, similique sit totam vero. Beatae consequatur cupiditate rerum?
                    </p>
                    <p>
                        Consectetur eligendi ipsam odio repellendus sequi veniam voluptas? Adipisci at consectetur eaque
                        fuga
                        hic inventore ipsa magnam
                        provident vitae. Ad animi commodi consectetur, corporis dicta doloremque dolorum error hic
                        inventore
                        iste laudantium libero magnam
                        mollitia necessitatibus nemo nesciunt nihil non obcaecati odio odit pariatur quae quaerat quas
                        quisquam
                        quos rem sapiente sequi
                        similique sint vero?
                    </p>                    
                    <p>To go to the sessions, click <Link to="/sessions"> <b> here! </b> </Link> </p>
                    <Button
                        className="round-button"
                        type="button"
                        onClick={handleClick}
                        text="NEWS!"
                    >
                    </Button>
                </section>
            </div>
        </>
    );
}

export default Home;