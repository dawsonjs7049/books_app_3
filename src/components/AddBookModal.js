import React, { useState, useEffect } from "react"
import StarRatingComponent from 'react-star-rating-component';

function AddBookModal({selectedBook, show, setShowAddBookModal, successToast}){

    let myImage, myTitle, myAuthor, myRating, myGenre, pages, infoLink, globalRating;
    if(selectedBook)
    {
        myImage = selectedBook.volumeInfo.imageLinks.thumbnail;
        myTitle = selectedBook.volumeInfo.title;
        myAuthor = selectedBook.volumeInfo.authors[0] ? selectedBook.volumeInfo.authors[0] : '';
        myRating = selectedBook.volumeInfo.averageRating;
        myGenre = selectedBook.volumeInfo.categories ? selectedBook.volumeInfo.categories[0] : '';
        pages = selectedBook.volumeInfo.pageCount;
        infoLink = selectedBook.volumeInfo.infoLink;
        globalRating = (selectedBook.volumeInfo.averageRating ? selectedBook.volumeInfo.averageRating : 0);
    }

    const [image, setImage] = useState(selectedBook ? (selectedBook.volumeInfo.imageLinks.thumbnail) : '');
    const [title, setTitle] = useState(selectedBook ? (selectedBook.volumeInfo.title) : '');
    const [author, setAuthor] = useState(selectedBook ? (selectedBook.volumeInfo.authors[0] ? selectedBook.volumeInfo.authors[0] : '') : '');
    const [rating, setRating] = useState(selectedBook ? (selectedBook.volumeInfo.averageRating) : '');
    const [genre, setGenre] = useState(selectedBook ? (selectedBook.volumeInfo.categories ? selectedBook.volumeInfo.categories[0] : '') : '');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        if(selectedBook)
        {
            setImage(myImage);
            setTitle(myTitle);
            setAuthor(myAuthor);
            setRating(myRating);
            setGenre(myGenre);

            console.log("IN ADD BOOK MODAL USE EFFECT");
        }
    }, [selectedBook])

    console.log("SELECTED BOOK: " + (selectedBook ? (JSON.stringify(selectedBook)) : ''));

    const handleBookSave = () => {
        // console.log("TITLE: " + title);
        // firebase
        //     .firestore()
        //     .collection('books')
        //     .add(
        //         {
        //             title: title,
        //             author: author,
        //             genre: genre,
        //             rating: rating,
        //             review: description,
        //             startDate: startDate,
        //             endDate: endDate,
        //             pages: pages,
        //             infoLink: infoLink,
        //             globalRating: globalRating,
        //             image: image
        //         }
        //     );

        //     console.log("ADDED...");
        //     setShowAddBookModal(false);
        //     setImage('');
        //     setTitle('');
        //     setAuthor('');
        //     setRating(0);
        //     setGenre('');
        //     setDescription('');
        //     setStartDate('');
        //     setEndDate('');
        //     setDescription('');

        //     successToast();
    }

    return (
        // ON CLICK FOR MODAL CONTENT STOPS PROPOGATION (ON CLICK EVENTS OUTSIDE OF ITSELF), SO IF WE PRESS INSIDE IT, THE ONCLICK FOR THE MODAL CONTAINER DOESN'T FIRE
        <div className={'addBookModalContainer ' +  ` ${show ? 'show' : ''}`} onClick={() => setShowAddBookModal(false)}>
            <div className="addBookModalContent" onClick={(e) => e.stopPropagation()}>
                <h2>Add Book to your Library</h2>
                <hr></hr>
                <div className={'bookModalInputsContainer'}>
                    <div style={{width: '50%'}}>
                        <img className={'bookModalThumbnail'} src={myImage} />
                    </div>
                    <div className={'bookModalInputs'}>
                        <div>
                            <div>Title</div>
                            <input className={'bookModalInput'} defaultValue={myTitle} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <div>Author</div>
                            <input className={'bookModalInput'} defaultValue={myAuthor} onChange={(e) => setAuthor(e.target.value)} />
                        </div>
                        <div>
                            <div>Genre</div>
                            <input className={'bookModalInput'} defaultValue={myGenre} onChange={(e) => setGenre(e.target.value)} />
                        </div>
                        <div>
                            <div>Date Started</div>
                            <input className={'bookModalInput'} type="date" defaultValue={''} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div>
                            <div>Date Finished</div>
                            <input className={'bookModalInput'} type="date" defaultValue={''} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <div>
                            <div>Rating</div>
                            {/* <input className={'bookModalInput'} type='number' defaultValue={myRating} onChange={(e) => setRating(e.target.value)} /> */}
                        
                            <StarRatingComponent 
                                name="rate1" 
                                starCount={5}
                                value={parseInt(rating)}
                                onStarClick={(nextValue, prevValue, name) => setRating(nextValue)}
                            />
                        </div>
                    </div>
                    
                </div>
                <div>
                <hr style={{marginTop: '2rem'}}/>
                    <div style={{textAlign: 'left', fontWeight: 'bold', marginTop: '1.5rem', fontSize: '1.2rem'}}>
                        Review
                    </div>
                    <textarea className={'bookModalDescriptionInput'} defaultValue={''} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className={'bookModalButtonContainer'}>
                    <button className="bookModalSaveButton" onClick={() => handleBookSave()}>Save</button>
                    <button className="bookModalCancelButton" onClick={() => setShowAddBookModal(false)}>Cancel</button>
                </div>
            </div>
            
        </div>
    );
}

export default AddBookModal;