import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBookmark, faBook} from '@fortawesome/free-solid-svg-icons'


import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';

function BookSearch(props) {
 
    const [search, setSearch] = useState('');
    const [cards, setCards] = useState([]);

    let { setSelectedBook, setShowAddBookModal } = props;  

    const handleSearch = () => {
        if(search !== '')
        {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=5`)
                .then(res => {
                    console.log(res.data);
                    setCards(res.data.items);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const handleAddBook = (item) =>
    {
        setSelectedBook(item);
        setShowAddBookModal(true);
    }

    const mouseEnter = (e) => {
        let card = document.getElementById(e.currentTarget.id);

        if(card)
        {
            card.style.width = '500px';
       
            let child = null;
            card.childNodes.forEach(node => {
                if(node.className == 'bookSearchRight')
                {
                    child = node;
                }
            })
    
            child.style.display = 'block';
            child.style.opacity = 1;
        }

    }

    const mouseLeave = (e) => {
        let card = document.getElementById(e.currentTarget.id);

        if(card)
        {
            card.style.width = '250px';

            let child = null;
            card.childNodes.forEach(node => {
                if(node.className == 'bookSearchRight')
                {
                    child = node;
                }
            })
    
            child.style.display = 'none';
            child.style.opacity = 0;
        }

    }

    const checkEnter = (e) => {
        if(e.keyCode == 13)
        {
            document.getElementById('searchBtn').click();
        }
    }

    return (
        <div className="bookSearch">

            <h1 style={{width: '100%', textAlign:'center', color: 'teal'}}>Search for Books <FontAwesomeIcon icon={faBookmark} /></h1>
            <div className="searchBar"></div>
            
            <div className="bookSearchInputs">
                <input type="text" placeholder="Search by title..." className="bookSearhInput" onChange={(e) => setSearch(e.target.value)} onKeyUp={(e) => checkEnter(e)}></input>
                <button type="submit" className="bookSearchBtn" id="searchBtn" onClick={() => handleSearch()}><FontAwesomeIcon icon={faSearch} /></button>
            </div>
    
            <div className={"bookSearchCardContainer"}>
                {
                    cards.length > 0 &&
                        cards.map((item) => (
                            <div className={"searchCard"} key={item.id} id={item.id} onMouseEnter={(e) => mouseEnter(e)} onMouseLeave={(e) => mouseLeave(e)}>
                                <div className="bookSearchLeft">
                                    <img className="thumbnail" src={(item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '')} data-id={item.id} />
                                    <div className="bookSearchDetailsContainer">
                                        
                                        <div className={'title'}>{item.volumeInfo.title}</div>
                                        <div>{item.volumeInfo.authors[0] ? item.volumeInfo.authors[0] : ''}</div> 
                                        <div>
                                            <StarRatingComponent 
                                                name="rate1" 
                                                starCount={5}
                                                value={parseInt(item.volumeInfo.averageRating)}
                                            />
                                        </div>
                                        
                                        <div>Pages: {item.volumeInfo.pageCount}</div>
                                        <div>Genre: {item.volumeInfo.categories ? item.volumeInfo.categories[0] : ''}</div>
                                        <div style={{width: '85%', height: '1.5px', backgroundColor: 'teal'}}></div>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: '100%'}}>
                                            <a style={{width: '40%'}}href={item.volumeInfo.infoLink} target="_blank"><button className={"infoLink"}>More Info</button></a>
                                            <button className={"addLibraryBtn"} onClick={() => handleAddBook(item)}>Add +</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bookSearchRight">
                                    <h3>Description</h3>
                                    <hr></hr>
                                    <p>{item.volumeInfo.description}</p>
                                </div>

                            </div>
                        ))
                }
            </div>
      </div>
    )
}

export default BookSearch;