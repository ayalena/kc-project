import './NewsItem.css';

function NewsItem({ title, author, content}) {
    return (
        <>
            <div className="newsitem-container">
                <h2>{title}</h2>
                <h3>{author}</h3>
                <p>{content}</p>
            </div>
        </>
    )
}

export default NewsItem;