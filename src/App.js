import {useEffect, useState} from "react";

function App() {
    const [authors, setAuthors] = useState([])
    const [poems, setPoem] = useState({
        author: '',
        title: '',
        lines: []
    })


    useEffect(() => {
        return () => {
            fetch("https://poetrydb.org/author")
                .then(r => r.json())
                .then(author => setAuthors(author.authors))

        };
    }, [setAuthors]);

    const getRandomInt = () => {
        return Math.floor(Math.random() * authors.length);
    }

    const getRandomPoem = () => {
        const author = authors[getRandomInt()];
        console.log(author)
        fetch(`https://poetrydb.org/random/1`)
            .then(r => r.json())
            .then(res => {
                setPoem(poem => ({
                    ...poem,
                    author: res[0].author,
                    title: res[0].title,
                    lines: res[0].lines
                }))
            })
    }

    return (
        <>
            {authors.length === 0 ? <h2>Loading authors</h2>
                : (poems.author ?
                    <div className="App">
                        <h2>{poems.author}</h2>
                        <h2>{poems.title}</h2>
                        <br/>
                        <h4>{poems.lines}</h4>
                        <button onClick={getRandomPoem}>Get random poem</button>
                    </div>
                    : <div className="App">
                        <button onClick={getRandomPoem}>Get random poem</button>
                    </div>)
            }
        </>
    );
}

export default App;
